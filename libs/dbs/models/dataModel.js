let moogoose = require('./../mognoose')


let dataSchema = new moogoose.Schema({
    //采集设备MAC地址
    MAC: {
        type: String,
        required: true
    },
    //wifi数组
    APs: [{
        //wifi名
        name: {
            type: String,
            index: true
        },
        //wifi MAC地址
        MAC: {
            type: String,
            required: true,
            index: true
        },
        //wifi 信号强度
        RSSI: {
            type: Number,
            required: true,
            index: true
        },
        //wifi 频率
        frequency:{
            type:Number,
            index:true
        }
    }],
    //采集日期
    date: {
        type: Date,
        default: new Date().getTime()
    }

})
dataSchema.path('APs').validate((v)=>{
    "use strict";
    return v.length
})

let dataModel = moogoose.model('data', dataSchema)


module.exports = dataModel