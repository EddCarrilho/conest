const {contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron,
    hello: () => ipcRenderer.send('send-message', "Oi!"),
    openAbout: ()=> ipcRenderer.send('open-about'),
    openclientes: ()=> ipcRenderer.send('open-clientes'),
    openfornecedores: ()=> ipcRenderer.send('open-fornecedores'),
    openprodutos: ()=> ipcRenderer.send('open-produtos')
})

// status de conexão (verificar se o banco de dados está conectado)

ipcRenderer.send('send-message', "Status do banco de dados:")

ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})

function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric', 
    }
    return data.toLocaleDateString('pt-BR', options)
}

window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})