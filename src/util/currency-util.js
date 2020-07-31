const formataParaReal = valor => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

module.exports = { formataParaReal };