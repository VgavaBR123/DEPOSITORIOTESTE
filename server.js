const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criar tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS numeros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero INTEGER NOT NULL
);`);

// Endpoint para salvar número
app.post('/api/salvar', (req, res) => {
    const { numero } = req.body;
    db.run(`INSERT INTO numeros (numero) VALUES (?)`, [numero], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Endpoint para buscar dados
app.get('/api/dados', (req, res) => {
    db.all(`SELECT * FROM numeros`, [], (err, rows) => {
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
