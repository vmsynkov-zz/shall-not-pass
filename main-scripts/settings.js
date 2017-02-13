const db = require('./database')

let settings

function init (cb) {
  db.findOne({_id: 1}, (err, result) => {
    if (err && cb) cb(err, null)
    // if you throw err here there will be no record in the call stack and you could not trace the problem. so you should callback with err instead
    settings = result
    if (cb) cb(null, result)
  })
}

function get (field) {
  return field ? settings[field] : settings
}

function set (query, inMemory, cb) {
  let _inMemory = false
  let isSecondArgFunc = typeof inMemory === 'function'
  if (inMemory !== undefined && !isSecondArgFunc) _inMemory = inMemory
  // if second arg is func then it's omitted and is callback
  // let _inMemory = inMemory === undefined ? false : (isSecondArgFunc ? false : inMemory)
  cb = cb || (isSecondArgFunc ? inMemory : () => {})

  // if (!cb && !isSecondArgFunc) {
  //   cb = () => {}
  // } else cb = inMemory

  let operationList = { $set: {} }

  for (let key in query) {
    if (!_inMemory) operationList.$set[key] = query[key]
    settings[key] = query[key]
  }

  if (!_inMemory) db.update({ _id: 1 }, operationList, { multi: true }, cb)
}

module.exports = {
  init,
  get,
  set
}
