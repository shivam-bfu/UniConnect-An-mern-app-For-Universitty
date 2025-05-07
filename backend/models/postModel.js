const mongoose=require('mongoose')

const postModel=mongoose.Schema(
    {
        post:String,
        image:Buffer,
        user: mongoose.Schema.Types.ObjectId,
        date:{
            type:Date,
            default:Date.now()

        }
    }
)

module.exports=mongoose.model('post',postModel)