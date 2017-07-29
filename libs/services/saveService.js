let fs = require('fs'),
    async = require('async'),
    buffer = require('buffer'),
    DataModel = require('../dbs/models/dataModel')

class SaveService {

    constructor() {
        this.fileDir = `${__dirname}\\..\\..\\uploads\\`
    }

    saveData(fileName, callback) {
        async.waterfall([
            //从文件中读取数据
            (callback) => {
                let path = this.fileDir + fileName
                fs.readFile(path, (err, buffer) => {
                    if (err) callback(err)
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
            },
            //将数据写入数据库
            (data, callback) => {
                async.mapLimit(data, 5, (dataBranch, callback) => {
                    DataModel.insertMany(dataBranch,(err)=>{
                        if (err) callback(err)
                        else callback(null)
                    })
                },(err)=>{
                    if(err) {
                        callback(err)
                    }
                    else {
                        callback(null)
                    }
                })
            }
        ], (err, res) => {
            callback(err, res)
        })
    }

}

module.exports = new SaveService()