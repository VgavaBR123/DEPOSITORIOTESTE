const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos

// Configurar conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost', // ou o endereço do seu servidor MySQL
    user: 'root', // seu usuário do MySQL
    password: '', // sua senha do MySQL
    database: 'test' // nome do banco de dados que você criou
});

// Conectar ao MySQL
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados MySQL:', err.message);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Endpoint para salvar número
app.post('/api/salvar', (req, res) => {
    const { numero } = req.body;
    db.query('INSERT INTO numeros (numero) VALUES (?)', [numero], (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId });
    });
});

// Endpoint para buscar dados
app.get('/api/dados', (req, res) => {
    db.query('SELECT * FROM numeros', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
