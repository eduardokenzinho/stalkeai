// Script para testar a API de scrape
const axios = require('axios');

async function testAPI() {
  console.log('🧪 Iniciando teste da API...\n');

  try {
    const username = 'instagram'; // teste com um usuário conhecido
    console.log(`📍 Testando com usuário: @${username}\n`);

    const response = await axios.get(`http://localhost:5000/api/get-profile-scrape?username=${username}`, {
      timeout: 30000
    });

    console.log('✅ API respondeu com sucesso!');
    console.log('\n📊 Dados recebidos:');
    console.log(JSON.stringify(response.data, null, 2));

    // Verifica se os dados são válidos
    const profile = response.data.profile;
    if (profile.followers > 0) {
      console.log('\n✅ Seguidores extraído com sucesso:', profile.followers);
    }
    if (profile.avatar) {
      console.log('✅ Avatar extraído com sucesso');
    }
    if (profile.bio) {
      console.log('✅ Bio extraída com sucesso');
    }

  } catch (error) {
    console.error('❌ Erro ao testar API:');
    console.error('Status:', error.response?.status);
    console.error('Mensagem:', error.message);
    console.error('Dados:', error.response?.data);
  }
}

testAPI();
