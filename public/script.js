document.getElementById('show-url-btn').addEventListener('click', function() {
    // Obtém a URL do servidor
    const serverUrl = window.location.origin + '/api/dados'; // URL do servidor + endpoint

    // Exibe a URL na página
    document.getElementById('url-display').innerText = `URL do Servidor: ${serverUrl}`;
    
    // Chama a função fetchData para pegar dados do servidor
    fetchData();
});

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
