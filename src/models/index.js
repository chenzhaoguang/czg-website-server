const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const info = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../privateInfo.json')).toString()
)

const account = info.adminAccount
const pwd = info.adminPassword

mongoose.connect(
  `mongodb://${account}:${pwd}@106.13.205.18:27017/koaBlog?authSource=admin`
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error:'))
db.once('open', function() {
  console.log('mongodb connection success!')
})
