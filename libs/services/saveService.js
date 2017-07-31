let fs = require('fs'),
    async = require('async'),
    buffer = require('buffer'),
    DataModel = require('../dbs/models/dataModel')

console.log(1)
class SaveService {

    constructor() {
        this.fileDir = `${__dirname}\\..\\..\\uploads\\`
    }

    //从文件中读取数据并切片
    readFile(fileName, callback) {
        let path = this.fileDir + fileName
        fs.readFile(path, (err, buffer) => {
            if (err) {
                callback(err)
            }
            else {
                let originalData = JSON.parse(buffer.toString()),
                    data = []

                while (originalData.length != 0) {
                    if (originalData.length <= 1000) {
                        data.push(originalData)
                        originalData = []
                    }
                    else {
                        let _data = originalData.splice(0, 1000)
                        data.push(_data)
                    }
                }

                callback(null, data)
            }
        })
    }

    //将数据写入数据库
    saveData(data, callback) {
        async.mapLimit(data, 5, (dataBranch, callback) => {
            DataModel.insertMany(dataBranch,(err)=>{
                if (err){
                    //UnhandledPromiseRejectionWarning handle
                    process.on('unhandledRejection', err => {})

                    let msg=err._message
                    for(let item in err.errors){
                        msg+='/'+err.errors[item].message
                    }
                    err=new Error(msg)
                    callback(err)
                }
                else callback(null)
            })
        }, (err) => callback(err))
    }

    save(fileName, callback) {
        async.waterfall([
            (callback) => {
                this.readFile(fileName, (err, data) => callback(err, data))
            },
            //将数据写入数据库
            (data, callback) => {
                this.saveData(data,(err)=>callback(err))
            }
        ], (err, res) => {
            callback(err, res)
        })
    }

}

module.exports = new SaveService()