/**
 * Processo de renderização
 * clientes
 */

// Mudar propriedades do documento ao iniciar (UX)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus() //foco no html 
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

// Função para manipular o evento Enter - (UX)
function teclaEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        //executar a função associada ao botão buscar
        buscarCliente()
    }
}

// Adicionar o função de manipulação do evento da teclaEnter
document.getElementById('frmCliente').addEventListener('keydown', teclaEnter)

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//captura dos inputs do formulário (passo 1 - slides)
let idCliente = document.getElementById('inputId')
let  formCliente  = document.getElementById('frmCliente')
let nomeCliente = document.getElementById('inputName')
let foneCliente = document.getElementById('inputPhone')
let emailCliente = document.getElementById('inputAddress')
//evento relacionado ao botão adicionar (ainda passo 1 - slide)
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value, idCliente)
    //Empacotar os dados em um objeto e enviar ao main.js (passo2 - slide)
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    api.newClient(cliente)
    //limpar os dados from após o envio
    formCliente.reset()
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// array(vetor) usado na renderização dos dados do cliente
let arrayCliente = []

// Função que vai enviar ao main um pedido de busca dos dados de um cliente pelo nome (Passo 1 - slide)
function buscarCliente() {
    let nomeCliente = document.getElementById('inputSearch').value
    //validação (UX)
    if(nomeCliente === "") {
        // validar campo obrigatório
        api.infoSearchDialog()
    } else {
        // enviar o pedido de busca junto com o nome do cliente
        api.searchClient(nomeCliente)
    }
    // Foco no campo de busca (UX)
    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })

    // Setar o nome do cliente e habilitar o cadastramento
    api.nameClient((args) => {
        // Restaurar o comportamento padrão da tecla Enter
        let setarNomeCliente = document.getElementById('inputSearch').value
        document.getElementById('inputName').value += setarNomeCliente
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputName').focus()
        // Limpar os campos para um novo cadastro
        document.getElementById('inputName').value = ""
        document.getElementById('inputPhone').value = ""
        document.getElementById('inputAddress').value = ""
        document.getElementById('inputId').value = ""
        btnRead.disabled = true
        btnCreate.disabled = false
        btnUpdate.disabled = false
        btnDelete.disabled = false
    })
    // limpar a caixa de busca e setar o foco
    api.clearSearch(() => {
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })
    // receber do main.js os dados do cliente (passo 4)
    api.dataClient((event, dadosCliente) => {
        arrayCliente = JSON.parse(dadosCliente)
        console.log(arrayCliente)
    // Passo 5 (final) percorre o array, extrair os dados e setar os campos de texto (caixas input) do formulário
    arrayCliente.forEach((c) => {
        document.getElementById('inputId').value = c._id,
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
function editarCliente() {
    const cliente = {
        idCli: idCliente.value,
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    console.log(cliente)
    // Enviar o objeto fornecedor ao main.js
    api.updateClient(cliente)
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirCliente() {
    let idCli = idCliente.value
    console.log(idCli)
    // Envio do id ao main.js
    api.deleteClient(idCli)
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

api.resetForm((args)=>{
    resetForm()
    formCliente.reset()
})

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