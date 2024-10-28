// script.js
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/dados'); // Use a URL do seu servidor
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();

        // Limpa a lista antes de adicionar novos itens
        const lista = document.getElementById('lista');
        lista.innerHTML = '';

        // Adiciona os dados na lista
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = JSON.stringify(item); // Aqui você pode formatar os dados como quiser
            lista.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

async function sendData(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const valorInput = document.getElementById('valor');
    const valor = valorInput.value;

    try {
        const response = await fetch('http://localhost:3000/api/adicionar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ valor }) // Enviando o valor como JSON
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar dados');
        }

        // Limpa o campo de input após o envio
        valorInput.value = '';
        fetchData(); // Atualiza a lista após enviar os dados
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
}

document.getElementById('botao').addEventListener('click', fetchData);
document.getElementById('formulario').addEventListener('submit', sendData);
