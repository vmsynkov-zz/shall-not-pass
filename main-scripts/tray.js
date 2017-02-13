const path = require('path')

const electron = require('electron')

const settings = require('./settings')

const Tray = electron.Tray

let tray = null

const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
const iconPath = path.join(__dirname, '../assets/img', iconName)

function create (masterWindow) {
  if (tray) return
  tray = new Tray(iconPath)

  tray.on('click', (event) => {
    if (!settings.get('stayInTray')) tray.destroy()
    masterWindow.isVisible()
      ? masterWindow.hide()
      : masterWindow.show()
  })

  tray.setToolTip('You shall not pass!')
}

module.exports = {
  create
}
