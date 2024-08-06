/**
 * Processo de renderização
 * clientes
 */

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//captura dos inputs do formulário (passo 1 - slides)
let formFornecedor  = document.getElementById('frmFornecedor2')
let razaoSFornecedor = document.getElementById('inputName')
let CNPJFornecedor = document.getElementById('inputCnpj')
let emailFornecedor = document.getElementById('inputEmail')
let foneFornecedor = document.getElementById('inputTelefone')
let CEPFornecedor = document.getElementById('inputCEP')
let ruaFornecedor = document.getElementById('inputlogradouro')
let bairroFornecedor = document.getElementById('inputbairro')
let numeroFornecedor = document.getElementById('inputnumero')
let compleFornecedor = document.getElementById('inputcomplemento')
let cidadeFornecedor = document.getElementById('inputcidade')
let UFFornecedor = document.getElementById('inputuf')

//evento relacionado ao botão adicionar (ainda passo 1 - slide)
formFornecedor.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(razaoSFornecedor.value, CNPJFornecedor.value, emailFornecedor.value, foneFornecedor.value, CEPFornecedor.value, ruaFornecedor.value, bairroFornecedor.value, numeroFornecedor,compleFornecedor.value, cidadeFornecedor.value, UFFornecedor.value)
    //Empacotar os dados em um objeto e enviar ao main.js (passo2 - slide)
    const fornecedor = {
        razaoSFor: razaoSFornecedor.value,
        CNPJFor: CNPJFornecedor.value,
        emailFor: emailFornecedor.value,
        foneFor: foneFornecedor.value,
        CEPFor: CEPFornecedor.value,
        ruaFor: ruaFornecedor.value,
        bairroFor: bairroFornecedor.value,
        numeroFor: numeroFornecedor.value,
        compleFor: compleFornecedor.value,
        cidadeFor: cidadeFornecedor.value,
        UFFor: UFFornecedor.value
    } 
    api.newFornecedor(fornecedor)
    //limpar os dados from após o envio
    formFornecedor.reset()
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<