const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Para aceitar requisições JSON
app.use(express.json()); 

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Define a rota para /api/dados
app.get('/api/dados', (req, res) => {
  res.json({ message: 'Dados recebidos com sucesso!' });
});

// Define a rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
