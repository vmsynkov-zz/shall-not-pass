const electron = require('electron')

const ipc = electron.ipcRenderer

function control (instructions) {
  for (let key in instructions) {
    switch (key) {
      case 'max':
        instructions[key].addEventListener('click', () => {
          ipc.send('window-maximize')
        })
        break
      case 'min':
        instructions[key].addEventListener('click', () => {
          ipc.send('window-minimize')
        })
        break
      case 'close':
        instructions[key].addEventListener('click', () => {
          ipc.send('window-close')
        })
        break
    }
  }
}

module.exports = {
  init: control
}
