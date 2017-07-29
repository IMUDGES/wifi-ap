let test_model = require('./../dbs/models/testModel')
let async = require('async')

class test_service {
    constructor() {

    }

    save(data, callback) {
        async.waterfall([
            (callback) => {
                //检查data结构
                callback(null,data)
            },
            (callback)=>{
                //储存
                let test=new test_model(data)
                test.save((err)=>callback(err))
            }
        ], (err) => {
            callback(err)
        })
    }

    insertMany(data,callback){
        test_model.insertMany(data,(err,docs)=>callback(err,docs))
    }


}
let service=new test_service()

let data=[]
for (let i=0;i<1000;i++){
    data.push({name:`id${i}`})
    console.log(data[i])
}

service.insertMany(data,(err, docs)=>{
    "use strict";
    if (err) console.log(err)
    if (docs) console.log(docs)
})

module.exports = service