const tituloBancarioUtil = require('../util/titulo-bancario-util');
const pagamentoConcessonariaUtil = require('../util/pagamento-concessonaria-util');
const { removeCaracteresEspeciais } = require('../util/utils');

module.exports = app => {
    app.get('/tituloBancario/:linhaDigitavel', (req, res) => {
        const { linhaDigitavel } = req.params;
        const linhaNumerica = removeCaracteresEspeciais(linhaDigitavel);

        if (linhaNumerica.length !== 47) {
            res.status(400).send('A linha digitável deve possuir 47 dígitos');
        } else {
            const tituloBancario = tituloBancarioUtil(linhaNumerica);
            res.send(tituloBancario).status(200);
        }
    });

    app.get('/pagamentoConcessonaria/:linhaDigitavel', (req, res) => {
        const { linhaDigitavel } = req.params;
        const linhaNumerica = removeCaracteresEspeciais(linhaDigitavel);

        if (linhaNumerica.length !== 48) {
            res.status(400).send('A linha digitável deve possuir 48 dígitos');
        } else {
            const pagamentoConcessonaria = pagamentoConcessonariaUtil(linhaNumerica);
            res.send(pagamentoConcessonaria);
        }
    });
};