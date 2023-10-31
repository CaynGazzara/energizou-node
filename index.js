const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3800; 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '4@D2hh50',
  database: 'energizou',
  port: 3316
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

app.use(cors())

app.use(express.json());

app.post('/empresas', (req, res) => {
  const novaEmpresa = req.body;
  db.query('INSERT INTO empresas SET ?', novaEmpresa, (err, results) => {
    if (err) {
      console.error('Erro ao inserir empresa:', err);
      res.status(500).json({ error: 'Erro ao inserir empresa' });
    } else {
      res.status(201).json({ message: 'Empresa criada com sucesso' });
    }
  });
});

app.get('/empresas', (req, res) => {
  db.query('SELECT * FROM empresas', (err, results) => {
    if (err) {
      console.error('Erro ao buscar empresas:', err);
      res.status(500).json({ error: 'Erro ao buscar empresas' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/empresas/:cnpj', (req, res) => {
  const cnpj = req.params.cnpj;
  db.query('SELECT * FROM empresas WHERE cnpj = ?', [cnpj], (err, results) => {
    if (err) {
      console.error('Erro ao buscar empresa:', err);
      res.status(500).json({ error: 'Erro ao buscar empresa' });
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: 'Empresa não encontrada' });
      }
    }
  });
});

app.put('/empresas/:id', (req, res) => {
  const clienteId = req.params.id;
  const novosDados = req.body;
  db.query('UPDATE empresas SET ? WHERE id = ?', [novosDados, clienteId], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar cliente:', err);
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    } else {
      res.status(200).json({ message: 'Cliente atualizado com sucesso' });
    }
  });
});

app.delete('/empresas/:id', (req, res) => {
  const clienteId = req.params.id; 
  db.query('DELETE FROM empresas WHERE id = ?', [clienteId], (err, results) => {
    if (err) {
      console.error('Erro ao excluir empresa:', err);
      res.status(500).json({ error: 'Erro ao excluir empresa' });
    } else {
      res.status(200).json({ message: 'Empresa excluída com sucesso' });
    }
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor está escutando na porta ${port}`);
});