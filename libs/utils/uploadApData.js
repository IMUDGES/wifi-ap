let multer = require('multer'),
    uuid = require('uuid')(),
    fs=require('fs'),
    mkdirp=require('mkdirp'),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');    // 保存的路径，备注：需要自己创建
        },
        //给上传文件重命名
        filename: (req, file, cb) => {
            "use strict";
            let date = new Date(),
                newFileName = `apData$${uuid.toString()}.json`
            cb(null, newFileName)
        }
    }),
    upload = multer({
        storage: storage
    })

module.exports=upload