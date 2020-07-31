const formataParaReal = valor => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const removeCaracteresEspeciais = string =>
    string.replace(/[-.\s]/g, '');

module.exports = { formataParaReal, removeCaracteresEspeciais };