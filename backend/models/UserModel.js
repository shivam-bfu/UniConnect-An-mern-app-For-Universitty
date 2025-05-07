const mongoose=require('mongoose')
mongoose.connect(`${process.env.MONGODB_URI}/UniConnect`)

const userSchema= mongoose.Schema({
    name:String,
    guId:String,
    password:String,
    email:String,
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ]
})
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = UserModel;