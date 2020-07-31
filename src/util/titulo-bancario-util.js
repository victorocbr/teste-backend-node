const moment = require('moment');

module.exports = linhaDigitavel => {

    const campo1 = linhaDigitavel.substring(0, 10);
    const campo2 = linhaDigitavel.substring(10, 21);
    const campo3 = linhaDigitavel.substring(21, 32);
    const campo4 = linhaDigitavel.substring(32, 33);
    const campo5 = linhaDigitavel.substring(33);

    const getDigitoVerificador = campo => campo.slice(-1);

    const removeDigitoVerificador = campo => campo.slice(0, -1);

    const somaAlgarismos = valor => {
        const [alg1, alg2] = String(valor);
        return Number(alg1) + Number(alg2);
    };

    const multiplicaCampos = campos => {
        let resultados = [];
        for (let i = campos.length - 1; i >= 0; i--) {
            let multiplicador = !(i % 2) ? 2 : 1;
            let resultado = campos[i] * multiplicador;
            resultado = resultado > 9 ? somaAlgarismos(resultado) : resultado;
            resultados = [resultado, ...resultados];
        }

        return [resultados.slice(0, 9), resultados.slice(9, 19), resultados.slice(19)];
    };

    const somaResultados = resultados =>
        resultados.reduce((total, valorAtual) => total + valorAtual, 0);

    calculaDezenaImediata = valor => {
        let dezena = valor;
        while (dezena % 10) {
            dezena++;
        }
        return { valor, dezena };
    };

    const calculaDigitos = somaResultadoCampos => {
        const valorDezena = somaResultadoCampos.map(calculaDezenaImediata);

        return valorDezena.map(({ valor, dezena }) => String(dezena - valor));
    };

    const validaCampos = () => {
        const DV1 = getDigitoVerificador(campo1);
        const DV2 = getDigitoVerificador(campo2);
        const DV3 = getDigitoVerificador(campo3);

        const campos = String.prototype.concat(
            removeDigitoVerificador(campo1),
            removeDigitoVerificador(campo2),
            removeDigitoVerificador(campo3)
        );

        const resultados = multiplicaCampos(campos);

        const somaResultadosCampos = resultados.map(somaResultados);

        const [resultadoDV1, resultadoDV2, resultadoDV3] = calculaDigitos(somaResultadosCampos);

        return resultadoDV1 === DV1 && resultadoDV2 === DV2 && resultadoDV3 === DV3;
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

        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(`${valorInteiro}.${valorDecimal}`);
    };

    const multiplaCamposCodBarra = campos => {
        let multiplicador = 2;
        let resultados = [];
        for (let i = campos.length - 1; i >= 0; i--) {
            let resultado = campos[i] * multiplicador++;

            resultados = [resultado, ...resultados];

            if (multiplicador > 9) {
                multiplicador = 2;
            }
        };

        return resultados;
    }

    const calculaDigito = soma => {
        const resto = soma % 11;
        const resultado = 11 - resto;

        if (resultado === 0 || resultado === 10 || resultado === 11) {
            return 1;
        } else {
            return resultado;
        }
    }

    const getCodigoDeBarras = () => {
        const banco = campo1.substring(0, 3);
        const moeda = campo1.substring(3, 4);
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

        const resultados = multiplaCamposCodBarra(codigoSemDigito);
        const total = somaResultados(resultados);
        const digito = calculaDigito(total);

        return String.prototype.concat(
            banco,
            moeda,
            digito,
            fatorVencimento,
            valorDocumento,
            numeroConvenio,
            complemento,
            agencia,
            conta,
            cart
        );
    };

    return {
        valido: validaCampos(),
        valor: calculaValor(),
        vencimento: calculaVencimento(),
        codigoDeBarras: getCodigoDeBarras()
    };
}

