/**
 * Modelo de dados (model) Fornecedores
 */

const {model, Schema} = require ('mongoose')

const fornecedorSchema = new Schema({
    razaoSFornecedor: {
        type: String
    },
    CNPJFornecedor: {
        type: Number
    },
    emailFornecedor: {
        type: String
    },
    foneFornecedor: {
        type: String
    },
    CEPFornecedor: {
        type: Number
    },
    ruaFornecedor: {
        type: String
    },
    bairroFornecedor: {
        type: String
    },
    numeroFornecedor: {
        type: Number
    },
    compleFornecedor: {
        type: String
    },
    cidadeFornecedor: {
        type: String
    },
    UFFornecedor: {
        type: String
    }
})

module.exports = model('Fornecedor', fornecedorSchema)