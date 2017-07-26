let test_model = require('./../dbs/models/test-model')
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


}

module.exports = new test_service()