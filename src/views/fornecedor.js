/**
 * Processo de renderização
 * clientes
 */

// Mudar propriedades do documento ao iniciar (UX)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('SearchFornecedor').focus() //foco no html 
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

// Função para manipular o evento Enter - (UX)
function teclaEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        //executar a função associada ao botão buscar
        buscarFornecedor()
    }
}

// Adicionar o função de manipulação do evento da teclaEnter
document.getElementById('frmFornecedor').addEventListener('keydown', teclaEnter)

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//captura dos inputs do formulário (passo 1 - slides)
let idFornecedor = document.getElementById('idfornecedor')
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
    console.log(razaoSFornecedor.value, CNPJFornecedor.value, emailFornecedor.value, foneFornecedor.value, CEPFornecedor.value, ruaFornecedor.value, bairroFornecedor.value, numeroFornecedor,compleFornecedor.value, cidadeFornecedor.value, UFFornecedor.value, idFornecedor)
    //Empacotar os dados em um objeto e enviar ao main.js (passo2 - slide)
    const fornecedor = {
        idFor: idFornecedor.value, 
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
    let razaoSFornecedor = document.getElementById('SearchFornecedor').value
    //validação (UX)
    if(razaoSFornecedor === "") {
        // validar campo obrigatório
        api.infoSearchDialog()
    } else {
        // enviar o pedido de busca junto com o nome do fornecedor
        api.searchFornecedor(razaoSFornecedor)
    }
    // Foco no campo de busca (UX)
    api.focusSearch((args) => {
        document.getElementById('SearchFornecedor').focus()
    })

    // Setar o nome do cliente e habilitar o cadastramento
    api.nameFornecedor((args) => {
        // Restaurar o comportamento padrão da tecla Enter
        let setarNomeFornecedor = document.getElementById('SearchFornecedor').value
        document.getElementById('inputName').value += setarNomeFornecedor
        document.getElementById('SearchFornecedor').value = ""
        document.getElementById('SearchFornecedor').blur()
        document.getElementById('SearchFornecedor').disabled = true
        document.getElementById('inputName').focus()
        // Limpar os campos para um novo cadastro
        document.getElementById('inputCnpj').value = ""
        document.getElementById('inputTelefone').value = ""
        document.getElementById('inputEmail').value = ""
        document.getElementById('idfornecedor').value = ""
        document.getElementById('inputCEP').value = ""
        document.getElementById('inputlogradouro').value = ""
        document.getElementById('inputnumero').value = ""
        document.getElementById('inputbairro').value = ""
        document.getElementById('inputcidade').value = ""
        document.getElementById('inputuf').value = ""
        document.getElementById('inputcomplemento').value = ""
        btnRead.disabled = true
        btnCreate.disabled = false
        btnUpdate.disabled = false
        btnDelete.disabled = false
    })
    // limpar a caixa de busca e setar o foco
    api.clearSearch(() => {
        document.getElementById('SearchFornecedor').value = ""
        document.getElementById('SearchFornecedor').focus()
    })
    // receber do main.js os dados do cliente (passo 4)
    api.dataFornecedor((event, dadosFornecedor) => {
        arrayFornecedor = JSON.parse(dadosFornecedor)
        console.log(arrayFornecedor)
    // Passo 5 (final) percorre o array, extrair os dados e setar os campos de texto (caixas input) do formulário
    arrayFornecedor.forEach((f) => {
        document.getElementById('idfornecedor').value = f._id,
        document.getElementById('inputName').value = f.razaoSFornecedor,
        document.getElementById('inputCnpj').value = f.CNPJFornecedor,
        document.getElementById('inputCEP').value = f.CEPFornecedor,
        document.getElementById('inputlogradouro').value = f.ruaFornecedor,
        document.getElementById('inputnumero').value = f.numeroFornecedor,
        document.getElementById('inputbairro').value = f.bairroFornecedor,
        document.getElementById('inputcidade').value = f.cidadeFornecedor,
        document.getElementById('inputuf').value = f.UFFornecedor,
        document.getElementById('inputcomplemento').value = f.compleFornecedor,
        document.getElementById('inputTelefone').value = f.foneFornecedor,
        document.getElementById('inputEmail').value = f.emailFornecedor
        // limpar a caixa de busca (UX)
        document.getElementById('SearchFornecedor').value = ""
        // ativar os botões update e delete
        document.getElementById('btnUpdate').disabled = false
        document.getElementById('btnDelete').disabled = false
        btnRead.disabled = true
        btnCreate.disabled = false
        btnUpdate.disabled = false
        btnDelete.disabled = false
        document.getElementById('SearchFornecedor').disabled = true
        document.getElementById('inputName').focus()
    })
})
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function editarFornecedor() {
    const fornecedor = {
        idFor: idFornecedor.value,
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
    console.log(fornecedor)
    // Enviar o objeto fornecedor ao main.js
    api.updateFornecedor(fornecedor)
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirFornecedor() {
    let idFor = idFornecedor.value
    console.log(idFor)
    // Envio do id ao main.js
    api.deleteFornecedor(idFor)
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

api.resetForm((args)=>{
    resetForm()
    formFornecedor.reset()
})

//Reset do formulário
function resetForm() {
    document.getElementById('SearchFornecedor').focus() //foco no html
    document.getElementById('SearchFornecedor').disabled = false
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    btnRead.disabled = false
    // Função para remover o manipulador de ventos da tecla Enter
    document.getElementById("frmFornecedor2").addEventListener("keydown", teclaEnter)
}