const mongoose=require('mongoose')
mongoose.connect(`${process.env.MONGODB_URI}/UniConnect`)

const alumniSchema= mongoose.Schema({
    name:String,
    guId:String,
    password:String,
    email:String,
    job:String,
    company:String,
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ]
})
const UserModel = mongoose.models.alumni || mongoose.model("Alumni", alumniSchema);
module.exports = UserModel;
