import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser{
    email : string,
    password : string,
    _id? : mongoose.Types.ObjectId,
    createdAt? : Date,
    updatedAt? : Date
}


// Here I am giving it a custom data type
const userSchema = new Schema<IUser>({
    email : {
        type : String,
        required: true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    }
},{timestamps : true})



// I am going to use the pre hook which can modify the data before storing it in the database
userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    // If the password is already modified then we'll give the control to the next hook
    next()
})


const User = models?.User || model<IUser>("User",userSchema) 

export default User