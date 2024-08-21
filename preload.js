const {contextBridge, ipcRenderer } = require('electron')

// processos
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron,
    hello: () => ipcRenderer.send('send-message', "Oi!"),
    openAbout: ()=> ipcRenderer.send('open-about'),
    openclientes: ()=> ipcRenderer.send('open-clientes'),
    openfornecedores: ()=> ipcRenderer.send('open-fornecedores'),
    openprodutos: ()=> ipcRenderer.send('open-produtos'),
    openclientes: () => ipcRenderer.send('open-clientes'),
    dbMessage: (message) => ipcRenderer.on('db-message', message),
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    newFornecedor: (fornecedor) => ipcRenderer.send('new-fornecedor', fornecedor),
    infoSearchDialog: () => ipcRenderer.send('dialog-infoSearchDialog'),
    focusSearch: (args) => ipcRenderer.on('focus-search', args),
    searchClient: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
    nameClient: (args) => ipcRenderer.on('name-client', args),
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    dataClient: (dadosCliente) => ipcRenderer.on('data-client', dadosCliente),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    updateClient: (cliente) => ipcRenderer.send('update-client', cliente),
    deleteClient: (idCli) => ipcRenderer.send('delete-client', idCli),
    dataFornecedor: (dadosFornecedor) => ipcRenderer.on('data-fornecedor', dadosFornecedor),
    searchFornecedor: (nomeFornecedor) => ipcRenderer.send('search-fornecedor', nomeFornecedor),
    nameFornecedor: (args) => ipcRenderer.on('name-fornecedor', args),
    updateFornecedor: (fornecedor) => ipcRenderer.send('update-fornecedor', fornecedor),
    deleteFornecedor: (idForn) => ipcRenderer.send('delete-fornecedor', idForn)
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

//conexão com o banco de dados
ipcRenderer.send('db-conect')
