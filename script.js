const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());

function registrarLog(nomeAluno) {
    const id = uuidv4();
    const dataHora = new Date().toISOString();
    const logMessage = `${id} - ${dataHora} - ${nomeAluno}\n`;

    fs.appendFile('logs.txt', logMessage, (err) => {
        if (err) throw err;
    });

    return id;
}

app.get('/', (req, res) => {
    res.send('Está funcionando');
});

app.post('/logs', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "Precisa do nome" });
    }

    const id = registrarLog(nome);
    res.status(201).json({ id, mensagem: "Registrado" });
});

app.get('/logs/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile('logs.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro ao ler o arquivo de logs." });
        }

        const logs = data.split('\n');
        const logEncontrado = logs.find(log => log.startsWith(id));

        if (logEncontrado) {
            return res.status(200).json({ log: logEncontrado });
        }

        res.status(404).json({ mensagem: "Não encontrado." });
    });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});
