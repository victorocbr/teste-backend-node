const express = require('express');
const app = express();
const TituloBancario = require('./util/titulo-bancario-util');

app.get('/tituloBancario/:linhaDigitavel', (req, res) => {
    const { linhaDigitavel } = req.params;
    const linhaNumerica = linhaDigitavel.replace(/[.\s]/g, '');

    if (linhaNumerica.length !== 47) {
        res.send('Quantidade inválida de dígitos');
    } else {
        const tituloBancario = TituloBancario(linhaNumerica);
        res.send(tituloBancario);
    }
});

// app.get('/pagamentoConcessonaria/:linhaDigitavel', (req, res) => {
//     const { linhaDigitavel } = req.params;
//     res.send(linhaDigitavel);
// });

app.listen(3000, () => console.log('Aplicação iniciada na porta 3000'));