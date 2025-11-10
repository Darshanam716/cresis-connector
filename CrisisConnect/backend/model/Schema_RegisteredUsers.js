import mongoose from "mongoose";
let new_user=mongoose.Schema({
    fullname:String,
    sex:String,
    height:Number,
    weight:Number,
    bloodgroup:String,
    dob:Date,
    email:String,
    phoneno:Number,
    adharno:Number,
    homeaddress:String,
    password:String
})
const registeredusers=mongoose.model("Registeredusers",new_user)
registeredusers.collection.createIndex({email:1},{unique:true})
export default registeredusers
