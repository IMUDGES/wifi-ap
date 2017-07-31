let moogoose = require('./../mognoose')


let dataSchema = new moogoose.Schema({
    MAC: {
        type: String,
        required: true
    },
    APs:[{
        MAC:{
            type:String,
            required:true,
            index:true
        },
        RSSI:{
            type:Number,
            required:true,
            index:true
        }

    }],
    date:{
        type:Date,
        default:new Date().getTime()
    }

})

let dataModel = moogoose.model('data', dataSchema)


module.exports=dataModel