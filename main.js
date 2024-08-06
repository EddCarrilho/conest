const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu, dialog} = require('electron/main')
const path = require('node:path')

// importar o módulo de conexão
const { dbStatus, desconectar} = require('./database.js')

let dbCon = null

const clienteSchema = require('./src/models/Cliente.js')
const fornecedorSchema = require('./src/models/Fornecedor.js')

// Janela principal (definir o objeto win como variável pública)
let win
const createWindow = () => {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './src/public/img/espada_madeira.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))

  win.loadFile('./src/views/index.html')
}

let about

const aboutWindow = () => {
      const father = BrowserWindow.getFocusedWindow()
      if (!about) {
            about = new BrowserWindow({
                  width: 800, 
                  height: 600, 
                  icon: './src/public/img/espada_diamante.png',   
                  resizable: false,
                  autoHideMenuBar: true,
                  parent: father,
                  modal: true 
              })
      }
      about.loadFile('./src/views/sobre.html')
      about.on('closed', () => {
            about = null
      })
}

let clientes

const clientesWindow = () => {
  const father = BrowserWindow.getFocusedWindow()
  if (!clientes) {
        clientes = new BrowserWindow({
              width: 800, 
              height: 600, 
              icon: './src/public/img/espada_diamante.png',   
              resizable: false,
              autoHideMenuBar: true,
              parent: father,
              modal: true,
              webPreferences: {
                preload: path.join(__dirname, 'preload.js')
              }
          })
  }
  clientes.loadFile('./src/views/clientes.html')
  clientes.on('closed', () => {
        clientes = null
  })
}

let fornecedores

const fornecedoresWindow = () => {
  const father = BrowserWindow.getFocusedWindow()
  if (!fornecedores) {
        fornecedores = new BrowserWindow({
              width: 1280, 
              height: 720, 
              icon: './src/public/img/espada_diamante.png',   
              resizable: false,
              autoHideMenuBar: true,
              parent: father,
              modal: true,
              webPreferences: {
                preload: path.join(__dirname, 'preload.js')
              }
          })
  }
  fornecedores.loadFile('./src/views/fornecedores.html')
  fornecedores.on('closed', () => {
        fornecedores = null
  })
}

let produtos

const produtosWindow = () => {
  const father = BrowserWindow.getFocusedWindow()
  if (!produtos) {
        produtos = new BrowserWindow({
              width: 1280, 
              height: 720, 
              icon: './src/public/img/espada_diamante.png',   
              resizable: false,
              autoHideMenuBar: true,
              parent: father,
              modal: true,
              webPreferences: {
                preload: path.join(__dirname, 'preload.js')
              }
          })
  }
  produtos.loadFile('./src/views/produtos.html')
  produtos.on('closed', () => {
        produtos = null
  })
}

// iniciar a aplicação
app.whenReady().then(() => {

    // status de conexão com o banco de dados
    ipcMain.on('send-message', (event, message) => {
        console.log(`<<< ${message}`)
        statusConexao()
    })

    ipcMain.on('db-conect', async (event, message) => {
      dbCon = await dbStatus()
      console.log(` ${message}`)
      event.reply('db-message', 'conectado')
    })

    // desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar(dbCon)
    })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

const menu = [
    {
        label: 'Arquivo',
        submenu: [
          {
            label: 'Clientes',
            click: () => clientesWindow()
          },
          {
            label: 'Fornecedores',
            click: () => fornecedoresWindow()
          },
          {
            label: 'Produtos',
            click: () => produtosWindow()
          },
          {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
          }
        ]
    },
    {
      label: 'Exibir',
      submenu: [
        {
              label: 'Recarregar',
              role: 'reload'
        },
        {
              label: 'Ferramentas do desenvolvedor',
              role: 'toggleDevTools'
        },
        {
              type: 'separator'
        },
        {
              label: 'Aplicar zoom',
              role: 'zoomIn'
        },
        {
              label: 'Reduzir',
              role: 'zoomOut'
        },
        {
              label: 'Restaurar o zoom padrão',
              role: 'resetZoom'
        }
      ]
    },
    {
        label: 'Ajuda',
        submenu: [
          {
                label: 'Sobre',
                click: () => aboutWindow()
          }
        ]
    }
  ]
  

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//-----------------------------------------------
// Função que verifica o status da conexão
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', "Banco de dados conectado")
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão: ${error.message}`)
    }
}

ipcMain.on('open-about', () => {
    aboutWindow()
})
ipcMain.on('open-clientes', () => {
  clientesWindow()
})
ipcMain.on('open-fornecedores', () => {
  fornecedoresWindow()
})
ipcMain.on('open-produtos', () => {
  produtosWindow()
})

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('new-client', async (event, cliente) => {
  console.log(cliente) //Teste do passo 2 - slide
  // Passo 3 (slide): cadastrar o cliente no MongoDB
  try {
    const novoCliente = new clienteSchema({
      nomeCliente: cliente.nomeCli,
      foneCliente: cliente.foneCli,
      emailCliente: cliente.emailCli
    })
    await novoCliente.save() //save() --moongose
    dialog.showMessageBox({
      type: 'info',
      title: 'Aviso',
      message: "Cliente cadastrado com sucesso!",
      buttons: ['OK']
  })
  } catch (error) {
    console.log(error)
  }
})

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('new-fornecedor', async (event, fornecedor) => {
  console.log(fornecedor) 
  try {
    const novoFornecedor = new fornecedorSchema({
      razaoSFornecedor: fornecedor.razaoSFor,
      CNPJFornecedor: fornecedor.CNPJFor,
      emailFornecedor: fornecedor.emailFor,
      foneFornecedor: fornecedor.foneFor,
      CEPFornecedor: fornecedor.CEPFor,
      ruaFornecedor: fornecedor.ruaFor,
      bairroFornecedor: fornecedor.bairroFor,
      numeroFornecedor: fornecedor.numeroFor,
      compleFornecedor: fornecedor.compleFor,
      cidadeFornecedor: fornecedor.cidadeFor,
      UFFornecedor: fornecedor.UFFor
    })
    await novoFornecedor.save() //save() --moongose
    dialog.showMessageBox({
      type: 'info',
      title: 'Aviso',
      message: "Fornecedor cadastrado com sucesso!",
      buttons: ['OK']
  })
  } catch (error) {
    console.log(error)
  }
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<