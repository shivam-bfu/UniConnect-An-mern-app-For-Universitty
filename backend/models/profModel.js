const mongoose=require('mongoose')


const profSchema= mongoose.Schema({
    name:String,
    guId:String,
    password:String,
    email:String,
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ],

    pdf:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'pdf'
        }
    ]
})

module.exports=mongoose.model('prof',profSchema)