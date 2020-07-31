const moment = require('moment');
const { modulo10, modulo11 } = require('./digito-verificador-util');
const { formataParaReal } = require('./utils');
const Boleto = require('../model/boleto');

module.exports = linhaDigitavel => {
    const campo1 = linhaDigitavel.substring(0, 11);
    const DV1 = linhaDigitavel.substring(11, 12);
    const campo2 = linhaDigitavel.substring(12, 23);
    const DV2 = linhaDigitavel.substring(23, 24);
    const campo3 = linhaDigitavel.substring(24, 35);
    const DV3 = linhaDigitavel.substring(35, 36);
    const campo4 = linhaDigitavel.substring(36, 47);
    const DV4 = linhaDigitavel.substring(47);
    const DVGeral = linhaDigitavel.substring(3, 4);
    const codigoMoeda = campo1.substring(2, 3);

    validaCampos = () => {
        const [resultadoDV1, resultadoDV2, resultadoDV3, resultadoDV4] = [campo1, campo2, campo3, campo4].map(modulo10);

        let resultadoDVGeral;

        if (codigoMoeda === '6' || codigoMoeda === '7') {
            resultadoDVGeral = modulo10(getCodigoDeBarras().codigoSemDigito);
        } else {
            resultadoDVGeral = modulo11(getCodigoDeBarras().codigoSemDigito);
        }

        return resultadoDV1 === DV1 && resultadoDV2 === DV2 && resultadoDV3 === DV3 && resultadoDV4 === DV4 && resultadoDVGeral === DVGeral;
    };

    calculaValor = () => {
        if (codigoMoeda === '6' || codigoMoeda === '8') {
            const codigoDeBarras = getCodigoDeBarras().codigoComDigito;
            const valorDocumento = codigoDeBarras.substring(4, 15);

            const valorInteiro = valorDocumento.substring(0, 9);
            const valorDecimal = valorDocumento.substring(9);

            return formataParaReal(`${valorInteiro}.${valorDecimal}`);
        } else {
            return null;
        }
    };

    calculaVencimento = () => {
        const identificacaoSegmento = campo1.substring(1, 2);
        const codigoDeBarras = getCodigoDeBarras().codigoComDigito;

        if (identificacaoSegmento === '6') {
            const vencimento = codigoDeBarras.substring(23, 31);
            return moment(vencimento).format('DD/MM/yyyy');
        } else {
            const vencimento = codigoDeBarras.substring(19, 27);
            return moment(vencimento).format('DD/MM/yyyy');
        }
    };

    getCodigoDeBarras = () => {
        const codigoComDigito = campo1 + campo2 + campo3 + campo4;

        const codigoSemDigito = codigoComDigito.substring(0, 3) + codigoComDigito.substring(4);

        return { codigoComDigito, codigoSemDigito };
    };

    return new Boleto(
        validaCampos(),
        calculaValor(),
        calculaVencimento(),
        getCodigoDeBarras().codigoComDigito
    );
};