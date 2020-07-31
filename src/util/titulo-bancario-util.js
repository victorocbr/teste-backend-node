const moment = require('moment');
const { modulo10, modulo11 } = require('./digito-verificador-util');
const { formataParaReal } = require('./utils');
const Boleto = require('../model/boleto');

module.exports = linhaDigitavel => {
    const campo1 = linhaDigitavel.substring(0, 9);
    const DV1 = linhaDigitavel.substring(9, 10);
    const campo2 = linhaDigitavel.substring(10, 20);
    const DV2 = linhaDigitavel.substring(20, 21);
    const campo3 = linhaDigitavel.substring(21, 31);
    const DV3 = linhaDigitavel.substring(31, 32);
    const DVGeral = linhaDigitavel.substring(32, 33);
    const campo5 = linhaDigitavel.substring(33);

    const validaCampos = () => {
        const [resultadoDV1, resultadoDV2, resultadoDV3] = [campo1, campo2, campo3].map(modulo10);

        const resultadoDVGeral = modulo11(getCodigoDeBarras().codigoSemDigito);

        return resultadoDV1 === DV1 && resultadoDV2 === DV2 && resultadoDV3 === DV3 && resultadoDVGeral === DVGeral;
    };

    const calculaVencimento = () => {
        const dataBase = moment('1997-10-07');
        const fatorVencimento = campo5.substring(0, 4);

        return dataBase.add(fatorVencimento, 'days').format('DD/MM/yyyy');
    };

    const calculaValor = () => {
        const valorDocumento = campo5.substring(4);

        const valorInteiro = valorDocumento.substring(0, 8);
        const valorDecimal = valorDocumento.substring(8);

        return formataParaReal(`${valorInteiro}.${valorDecimal}`);
    };

    const getCodigoDeBarras = () => {
        const banco = campo1.substring(0, 3);
        const moeda = campo1.substring(3, 4);
        const dv = DVGeral;
        const fatorVencimento = campo5.substring(0, 4);
        const valorDocumento = campo5.substring(4);
        const numeroConvenio = campo1.substring(4, 9);
        const complemento = campo2.substring(0, 6);
        const agencia = campo2.substring(6, 10);
        const conta = campo3.substring(0, 8);
        const cart = campo3.substring(8, 10);

        const codigoSemDigito = String.prototype.concat(
            banco,
            moeda,
            fatorVencimento,
            valorDocumento,
            numeroConvenio,
            complemento,
            agencia,
            conta,
            cart
        );

        const codigoComDigito = String.prototype.concat(
            banco,
            moeda,
            dv,
            fatorVencimento,
            valorDocumento,
            numeroConvenio,
            complemento,
            agencia,
            conta,
            cart
        );

        return { codigoComDigito, codigoSemDigito };
    };

    return new Boleto(
        validaCampos(),
        calculaValor(),
        calculaVencimento(),
        getCodigoDeBarras().codigoComDigito
    );
};