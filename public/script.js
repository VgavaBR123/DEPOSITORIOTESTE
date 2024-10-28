document.getElementById('show-url-btn').addEventListener('click', function() {
    const serverUrl = window.location.origin + '/api/dados';
    document.getElementById('url-display').innerText = `URL do Servidor: ${serverUrl}`;
    fetchData();
});

// Função para buscar dados
async function fetchData() {
    try {
        const response = await fetch('/api/dados');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados: ' + response.status);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Função para enviar número
async function enviarNumero(numero) {
    try {
        const response = await fetch('/api/salvar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ numero })
        });
        if (!response.ok) {
            throw new Error('Erro ao salvar número: ' + response.status);
        }
        const result = await response.json();
        console.log('Número salvo com ID:', result.id);
    } catch (error) {
        console.error('Erro ao enviar número:', error);
    }
}

// Exemplo: enviar um número ao clicar no botão
document.getElementById('show-url-btn').addEventListener('click', function() {
    const numero = prompt("Digite um número para salvar:");
    if (numero) {
        enviarNumero(Number(numero));
    }
});
