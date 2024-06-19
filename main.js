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
      if (!about) {
            about = new BrowserWindow({
                  width: 360, 
                  height: 220, 
                  icon: './src/public/img/espada_diamante.png',   
                  resizable: false,
                  autoHideMenuBar: true 
              })
      }
      about.loadFile('./src/views/sobre.html')
      about.on('closed', () => {
            about = null
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
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
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