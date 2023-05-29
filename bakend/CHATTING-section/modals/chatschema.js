const mongoose=require('mongoose')

const chatschema=mongoose.Schema({
    chatName:{type:String,trim:true},

    isGroupChat:{type:Boolean,default:false},
   
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    
    latestMessage:{type:mongoose.Schema.Types.ObjectId,ref:"messages"},

    groupAdmin:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{
    timestamps:true,
})

const Chat=mongoose.model("Chat",chatschema)

module.exports=Chat;