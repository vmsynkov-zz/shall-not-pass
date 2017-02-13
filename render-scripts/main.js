const electron = require('electron')

const db = require('../main-scripts/database')
const controls = require('./controls')

const ipc = electron.ipcRenderer

let closeBtn = document.getElementById('close')
let minBtn = document.getElementById('min')
let maxBtn = document.getElementById('max')

controls.init({
  close: closeBtn,
  min: minBtn,
  max: maxBtn
})

let inputService = document.getElementById('input-service')
let inputLogin = document.getElementById('input-login')
let inputPassword = document.getElementById('input-password')
let addBtn = document.getElementById('add')

let recordsContainer = document.getElementById('records')

function renderRecord () {
  db.find({_id: /[^1]+/}, (err, res) => {
    let recordTemplate
    let full = []
    res.forEach((record) => {
      recordTemplate = `<div class='record'><div>${record.service}</div><div>${record.login}</div><div>${record.password}</div></div>`
      full.push(recordTemplate)
    })
    recordsContainer.innerHTML = full.join('')
  })
}

function insertErrorMessage (root) {
  let container = document.createElement('div')
  container.addEventListener('click', () => {
    container.parentNode.removeChild(container)
  })
  container.textContent = 'Could not save to database'
  container.style.backgroundColor = 'red'
  root.insertBefore(container, root.firstChild)
}

db.loadDatabase((err) => {
  if (err) throw err
  else {
    renderRecord()
    addBtn.addEventListener('click', () => {
      let service = inputService.value
      let login = inputLogin.value
      let password = inputPassword.value
      if (service && login && password) {
        let templ = `<div>${service}</div><div>${login}</div><div>${password}</div>`
        let cont = document.createElement('div')
        cont.style.backgroundColor = 'black'
        cont.className = 'record'
        cont.innerHTML = templ
        recordsContainer.insertBefore(cont, recordsContainer.firstElementChild)

        db.insert({
          service,
          login,
          password
        }, (err, newDoc) => {
          err = {}
          if (err) {
            insertErrorMessage(cont)
            throw err
          }
        })
      }
    })
  }
})
