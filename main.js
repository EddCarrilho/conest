const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')

// importar o módulo de conexão
const {conectar, desconectar} = require('./database.js')

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
                  width: 500, 
                  height: 360, 
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
              width: 360, 
              height: 220, 
              icon: './src/public/img/espada_diamante.png',   
              resizable: false,
              autoHideMenuBar: true,
              parent: father,
              modal: true  
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
              width: 360, 
              height: 220, 
              icon: './src/public/img/espada_diamante.png',   
              resizable: false,
              autoHideMenuBar: true,
              parent: father,
              modal: true 
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
              width: 360, 
              height: 220, 
              icon: './src/public/img/espada_diamante.png',   
              resizable: false,
              autoHideMenuBar: true,
              parent: father,
              modal: true 
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

    // desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar()
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