const url = require('url')
const path = require('path')

const electron = require('electron')

const settings = require('./settings')
const tray = require('./tray')

const ipc = electron.ipcMain
const BrowserWindow = electron.BrowserWindow

const debug = /--debug/.test(process.argv[1])

let window

let windowSettings = {
  width: 800,
  height: 600,
  frame: false,
  show: false
}

function _load (view) {
  let file = view + '.html'
  window.loadURL(url.format({
    pathname: path.join(__dirname, '../html', file),
    protocol: 'file:',
    slashes: true
  }))
}

function create (firstStart, startInTray) {
  let view = 'login'

  if (firstStart) {
    view = 'register'
    settings.set({isFirstStart: false}, (err) => {
      if (err) throw err
    })
  }

  window = new BrowserWindow(windowSettings)

  _load(view)

  if (debug) {
    window.webContents.openDevTools()
  }

  window.once('ready-to-show', () => {
    if (!startInTray) {
      window.show()
    }
  })

  window.on('closed', () => {
    window = null
  })

  return window
}

function exists () {
  return window === null
}

ipc.on('load-window', (event, name) => {
  _load(name)
})

ipc.on('window-maximize', () => {
  window.maximize()
})

ipc.on('window-minimize', () => {
  window.minimize()
})

ipc.on('window-close', () => {
  let isLogin = window.webContents.getTitle() === 'Login'
  if (settings.get('closeToTray')) {
    tray.create(window)
    window.hide()

    if (!settings.get('rememberPassword') && !isLogin) _load('login')
  } else window.close()
})

module.exports = {
  exists,
  create,
  load: _load
}
