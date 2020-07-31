const { removeCaracteresEspeciais } = require('../util/utils');
const tituloBancarioUtil = require('../util/titulo-bancario-util');
const pagamentoConcessonariaUtil = require('../util/pagamento-concessonaria-util');

module.exports = app => {
    app.get('/tituloBancario/:linhaDigitavel', (req, res) => {
        const { linhaDigitavel } = req.params;
        const linhaNumerica = removeCaracteresEspeciais(linhaDigitavel);

        if (linhaNumerica.length !== 47) {
            res.status(400).send({ erro: 'A linha digitável deve possuir 47 dígitos' });
            return;
        }

        res.send(tituloBancarioUtil(linhaNumerica));
    });

    app.get('/pagamentoConcessonaria/:linhaDigitavel', (req, res) => {
        const { linhaDigitavel } = req.params;
        const linhaNumerica = removeCaracteresEspeciais(linhaDigitavel);

        if (linhaNumerica.length !== 48) {
            res.status(400).send({ erro: 'A linha digitável deve possuir 48 dígitos' });
            return;
        }

        res.send(pagamentoConcessonariaUtil(linhaNumerica));
    });
};