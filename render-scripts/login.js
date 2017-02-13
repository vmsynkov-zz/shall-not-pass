const electron = require('electron')

const controls = require('./controls')
// const mpass = require('mpass')

const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('close')
const submitButton = document.getElementById('submit')
const inputElement = document.getElementById('password')

controls.init({
  close: closeBtn
})

submitButton.addEventListener('click', (event) => {
  let remember = document.getElementById('remember').checked
  let password = inputElement.value
  ipc.send('check-master-pass', password, remember)
})

ipc.on('master-pass-ok', (event) => {
  ipc.send('load-window', 'main')
})

ipc.on('master-pass-fail', (event) => {
  //
})

