async function fetchData() {
  try {
    const response = await fetch('/api/dados'); // A URL deve ser relativa
    if (!response.ok) {
      throw new Error('Erro ao buscar dados: ' + response.status);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

fetchData(); // Chama a função para buscar dados
