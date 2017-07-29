let multer = require('multer'),
    uuid = require('uuid'),
    fs=require('fs'),
    mkdirp=require('mkdirp'),
    storage = multer.diskStorage({

        //给上传文件重命名
        filename: (req, file, cb) => {
            "use strict";
            let date = new Date(),
                newFileName = `${file.fieldname}-DATE:${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}-${date.getHours()}:${date.getMinutes()}-${uuid().toString()}`
            cb(null, newFileName)
        }
    }),
    upload = multer({
        storage: storage
    })

module.exports=upload