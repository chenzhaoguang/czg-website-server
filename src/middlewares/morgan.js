const path = require('path');
const fs = require('fs');
const morgan = require('koa-morgan');

module.exports = (app) =>{
    const ENV = process.env.NODE_ENV
    if(ENV!='prd'){
        app.use(morgan('dev'))
    }else{
        const logFileName = path.join(__dirname,'../../','logs','access.log')
        const writeStream = fs.createWriteStream(logFileName,{
            flags:'a'
        })
        app.use(morgan('combined',{
            stream:writeStream
        }))
    }
}