const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para analisar requisições JSON

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost', // Ou o endereço do seu servidor MySQL
    user: 'root',
    password: '',
    database: 'test'
});

// Conexão ao MySQL
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

// Rota para obter dados
app.get('/api/dados', (req, res) => {
    db.query('SELECT * FROM numeros', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Rota para adicionar dados
app.post('/api/adicionar', (req, res) => {
    const { valor } = req.body;
    db.query('INSERT INTO sua_tabela (coluna) VALUES (?)', [valor], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send('Valor adicionado com sucesso');
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
