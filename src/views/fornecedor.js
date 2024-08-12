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
// array(vetor) usado na renderização dos dados do fornecedor
let arrayFornecedor = []

// Função que vai enviar ao main um pedido de busca dos dados de um fornecedor pelo nome (Passo 1 - slide)
function buscarFornecedor() {
    let nomeFornecedor = document.getElementById('SearhFornecedor').value
    //validação (UX)
    if(nomeFornecedor === "") {
        // validar campo obrigatório
        api.infoSearchDialog()
    } else {
        // enviar o pedido de busca junto com o nome do fornecedor
        api.searchFornecedor(nomeFornecedor)
    }
    // Foco no campo de busca (UX)
    api.focusSearch((args) => {
        document.getElementById('SearhFornecedor').focus()
    })

    // Setar o nome do cliente e habilitar o cadastramento
    api.nameClient( async (args) => {
        // Restaurar o comportamento padrão da tecla Enter
        let setarNomeFornecedor = document.getElementById('SearhFornecedor').value
        document.getElementById('inputName').value += setarNomeFornecedor
        document.getElementById('SearhFornecedor').value = ""
        document.getElementById('SearhFornecedor').blur()
        document.getElementById('SearhFornecedor').disabled = true
        document.getElementById('inputName').focus()
        btnRead.disabled = true
        btnCreate.disabled = false
        btnUpdate.disabled = false
        btnDelete.disabled = false
    })
    // limpar a caixa de busca e setar o foco
    api.clearSearch(() => {
        document.getElementById('SearhFornecedor').value = ""
        document.getElementById('SearhFornecedor').focus()
    })
    // receber do main.js os dados do cliente (passo 4)
    api.dataClient((event, dadosCliente) => {
        arrayCliente = JSON.parse(dadosCliente)
        console.log(arrayCliente)
    // Passo 5 (final) percorre o array, extrair os dados e setar os campos de texto (caixas input) do formulário
    arrayCliente.forEach((c) => {
        document.getElementById('idfornecedor').value = c._id,
        document.getElementById('inputName').value = c.nomeCliente,
        document.getElementById('inputPhone').value = c.foneCliente,
        document.getElementById('inputAddress').value = c.emailCliente
        // limpar a caixa de busca (UX)
        document.getElementById('inputSearch').value = ""
        // ativar os botões update e delete
        document.getElementById('btnUpdate').disabled = false
        document.getElementById('btnDelete').disabled = false
    })
})
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Reset do formulário
function resetForm() {
    document.getElementById('inputSearch').focus() //foco no html
    document.getElementById('inputSearch').disabled = false
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    btnRead.disabled = false
    // Função para remover o manipulador de ventos da tecla Enter
    document.getElementById("frmCliente").addEventListener("keydown", teclaEnter)
}