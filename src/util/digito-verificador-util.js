module.exports = () => {

    const somaAlgarismos = valor => {
        const [alg1, alg2] = String(valor);
        return Number(alg1) + Number(alg2);
    };

    const somaResultados = resultados => resultados.reduce((acum, valor) => acum + valor, 0);

    const modulo10 = campos => {
        let resultados = [];
        for (let i = campos.length - 1; i >= 0; i--) {
            let multiplicador = !(i % 2) ? 2 : 1;
            let resultado = campos[i] * multiplicador;
            resultado = resultado > 9 ? somaAlgarismos(resultado) : resultado;
            resultados = [resultado, ...resultados];
        }

        const soma = somaResultados(resultados);

        const resto = soma % 10;

        return String(!resto ? resto : 10 - resto);
    };

    return {
        modulo10
    }
}