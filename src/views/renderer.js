/**
 * Processo de renderização do documento index.html
 */

console.log("Processo de renderização")

console.log(`Electron: ${api.verElectron()}`)
api.hello()

function sobre() {
    api.openAbout()
}
function clientes() {
    api.openclientes()
}
function fornecedores() {
    api.openfornecedores()
}
function produtos() {
    api.openprodutos()
}
function ok() {
    app.quit()
}

// inserir data no rodapé da tela principal
document.getElementById('dataAtual').innerHTML = obterData()

function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}

// alteração do ícone do status do banco de dados
document.addEventListener('DOMContentLoaded', () => {
    api.dbmessage((event, message) => {
        console.log(message)
        if (message === "Banco de dados conectado") {
            document.getElementById('status').src = "../public/img/dbon.png"
        } else {
            document.getElementById('status').src = "../public/img/dboff.png"
        }
    })
})