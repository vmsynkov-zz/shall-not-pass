const path = require('path')

const Datastore = require('nedb')

const dataFile = path.join(__dirname, '../datafile')
let database

if (!database) database = new Datastore({filename: dataFile})

module.exports = database
