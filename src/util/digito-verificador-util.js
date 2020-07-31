const somaAlgarismos = valor => {
    const [alg1, alg2] = String(valor);
    return Number(alg1) + Number(alg2);
};

const somaResultados = resultados => resultados.reduce((acum, valor) => acum + valor, 0);

const modulo10 = campos => {
    let resultados = [];
    let multiplicador = 2;

    for (let i = campos.length - 1; i >= 0; i--) {
        let resultado = campos[i] * multiplicador;
        resultado = resultado > 9 ? somaAlgarismos(resultado) : resultado;
        resultados = [resultado, ...resultados];

        multiplicador = multiplicador === 2 ? 1 : 2;
    }

    const soma = somaResultados(resultados);

    const resto = soma % 10;

    return String(!resto ? resto : 10 - resto);
};

const modulo11 = campos => {
    let multiplicador = 2;
    let resultados = [];

    for (let i = campos.length - 1; i >= 0; i--) {
        let resultado = campos[i] * multiplicador++;
        resultados = [resultado, ...resultados];

        multiplicador = multiplicador > 9 ? 2 : multiplicador;
    };

    const soma = somaResultados(resultados);
    const resultado = 11 - (soma % 11);

    return String(resultado === 0 || resultado === 10 || resultado === 11 ? 1 : resultado);
}

module.exports = { modulo10, modulo11 };