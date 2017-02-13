const electron = require('electron')

const window = require('./window')
const db = require('./database')
const settingsManager = require('./settings')
const tray = require('./tray')

require('./master-password')

const app = electron.app

function _init () {
  db.loadDatabase((err) => {
    if (err) throw err
    settingsManager.init((err, settings) => {
      if (err) throw err
      let win = window.create(settings.isFirstStart, settings.startInTray)
      if (settings.startInTray) tray.create(win)
    })
  })
}

app.on('ready', _init)

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!window.exists()) {
    window.create()
  }
})
