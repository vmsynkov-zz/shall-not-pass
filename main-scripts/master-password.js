const electron = require('electron')
const ipc = electron.ipcMain

const settings = require('./settings')
const password = require('../lib/password')
const window = require('./window')

ipc.on('save-master-pass', (event, input) => {

  password.hash(input, (err, hash) => {
    if (err) throw err

    settings.set({masterPassword: hash}, (err) => {
      if (err) throw err
      window.load('login')
    })
  })
})

ipc.on('check-master-pass', (event, input, remember) => {
  let hash = settings.get('masterPassword')

  password.verify(input, hash, (err, matches) => {
    if (err) throw err

    if (matches && remember) settings.set({rememberPassword: true}, true)

    let answer = matches ? 'master-pass-ok' : 'master-pass-fail'
    event.sender.send(answer)
  })
})
