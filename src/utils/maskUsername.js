export const maskUsername = (username) => {
  if (!username) return '******';
  
  const cleanUsername = username.replace(/^@+/, '').trim();
  
  // Se username for curto, mostrar apenas primeira letra
  if (cleanUsername.length <= 3) {
    return cleanUsername.charAt(0) + '****';
  }
  
  // Mostrar primeiras 3-4 letras + asteriscos
  const visibleChars = Math.min(3, Math.floor(cleanUsername.length / 2));
  const maskedPart = '*'.repeat(Math.max(3, cleanUsername.length - visibleChars));
  
  return cleanUsername.substring(0, visibleChars) + maskedPart;
};

// Exemplo: "joaosilva" → "joa******"