const express = require('express');
const app = express();
const tituloBancarioUtil = require('./util/titulo-bancario-util');
const pagamentoConcessonariaUtil = require('./util/pagamento-concessonaria-util');

app.get('/tituloBancario/:linhaDigitavel', (req, res) => {
    const { linhaDigitavel } = req.params;
    const linhaNumerica = linhaDigitavel.replace(/[.\s]/g, '');

    if (linhaNumerica.length !== 47) {
        res.status(400).send({ mensagem: 'A linha digitável deve possuir 47 dígitos' });
    } else {
        const tituloBancario = tituloBancarioUtil(linhaNumerica);
        res.send(tituloBancario).status(200);
    }
});

app.get('/pagamentoConcessonaria/:linhaDigitavel', (req, res) => {
    const { linhaDigitavel } = req.params;
    const linhaNumerica = linhaDigitavel.replace(/[-\s]/g, '');

    if (linhaNumerica.length !== 48) {
        res.status(400).send({ mensagem: 'A linha digitável deve possuir 48 dígitos' });
    } else {
        const pagamentoConcessonaria = pagamentoConcessonariaUtil(linhaNumerica);
        res.send(pagamentoConcessonaria);
    }
});

app.listen(3333, () => console.log('Aplicação iniciada na porta 3333'));