import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [nearbyCity, setNearbyCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchLocation() {
      try {
        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal,
        });
        const data = await response.json();
        
        if (data.city && data.latitude && data.longitude) {
          const locationData = {
            city: data.city,
            lat: data.latitude,
            lon: data.longitude
          };
          
          setLocation(locationData);
          
          // Buscar cidade vizinha
          try {
            const nearbyCityName = await fetchNearbyCity(
              data.latitude, 
              data.longitude, 
              data.city
            );
            setNearbyCity(nearbyCityName || data.city);
          } catch (err) {
            setNearbyCity(data.city);
          }
        }
      } catch (error) {
        console.error('Erro ao obter localização:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLocation();
    return () => controller.abort();
  }, []);

  return { location, nearbyCity, loading };
}

// Função para buscar cidade vizinha usando GeoNames
async function fetchNearbyCity(lat, lon, currentCity) {
  try {
    const username = 'demo';
    const response = await fetch(
      `https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&radius=50&maxRows=10&username=${username}&lang=pt`
    );
    
    const data = await response.json();
    
    if (data.geonames && data.geonames.length > 0) {
      // Retornar primeira cidade diferente da atual
      const cities = data.geonames
        .filter(place => place.name !== currentCity)
        .map(place => place.name);
      
      return cities[0] || cities[1] || cities[2] || currentCity;
    }
    
    return currentCity;
  } catch (error) {
    console.error('Erro ao buscar cidade vizinha:', error);
    return currentCity;
  }
}