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

// Alterar comportamento do Enter dentro do formulário (relacionar ao botão de busca) - (UX) 
document.getElementById('frmCliente').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        //executar a função associada ao botão buscar
        buscarCliente()
    }
})


//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//captura dos inputs do formulário (passo 1 - slides)
let  formCliente  = document.getElementById('frmCliente')
let nomeCliente = document.getElementById('inputName')
let foneCliente = document.getElementById('inputPhone')
let emailCliente = document.getElementById('inputAddress')
//evento relacionado ao botão adicionar (ainda passo 1 - slide)
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value)
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
    let nomeCliente = document.getElementById('inputSearch').value.trim()
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
        let setarNomeCliente = document.getElementById('inputSearch').value.trim()
        document.getElementById('inputName').value = setarNomeCliente
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputName').focus()
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
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Reset do formulário
function resetForm() {
    document.getElementById('inputSearch').focus() //foco no html 
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    document.getElementById('inputSearch').disabled = false
    btnRead.disabled = false
}