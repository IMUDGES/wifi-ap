let mongoose=require('mongoose')
let config=require('./config')

let opt={
    user: config.user,
    pass: config.pass,
    auth: {
        authdb: config.db
    }
}
mongoose.connect(config.url);

module.exports=mongoose