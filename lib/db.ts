import mongoose from "mongoose";

// here we're taking guarantee by '!' that this MONGODB_URI will be there in the .env
const MONGODB_URI = process.env.MONGODB_URI!

if(!MONGODB_URI){
    throw new Error("Please define Mongo URI in env variables")
}

// This variable will keep the cached of the databse connection
let cached = global.mongoose
if(!cached){
    cached = global.mongoose = {conn : null, promise : null}
}


export default async function ConnectDB(){
    // If connected then use the connected one
    if(cached.conn){
        return cached.conn
    }

    // So if there's no promise that means the connection is not ongoing so connect to the database first here
    // send the connection request
    if(!cached.promise){
        // const options = {
        //     bufferCommands : true, maxPoolSize : 10
        // }
        mongoose
        .connect(MONGODB_URI)
        .then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn
}