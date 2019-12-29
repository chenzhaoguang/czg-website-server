const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const Admin = require('./admin')


const info = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../privateInfo.json')).toString()
)
const account = info.adminAccount
const password = info.adminPassword

mongoose.connect(
  `mongodb://${account}:${password}@127.0.0.1:27017/koaBlog?authSource=admin`
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error:'))
db.once('open', function() {
  //    创建管理员

  const admin = new Admin({ account, password })
  admin.save(function(err, admin) {
    if (err) {
      console.log(err)
    } else {
      console.log(admin)
    }
  })
})
