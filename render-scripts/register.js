const electron = require('electron')

const ipc = electron.ipcRenderer

const submitButton = document.getElementById('submit')
const inputElement = document.getElementById('password')

submitButton.addEventListener('click', (event) => {
  let input = inputElement.value

  ipc.send('save-master-pass', input)
})
