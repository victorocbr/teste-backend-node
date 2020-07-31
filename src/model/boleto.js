class Boleto {
    constructor(valido, valor, vencimento, codigoDeBarras) {
        this.valido = valido,
        this.valor = valor,
        this.vencimento = vencimento,
        this.codigoDeBarras = codigoDeBarras
    }
}

module.exports = Boleto;