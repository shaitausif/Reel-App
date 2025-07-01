import { NextRequest, NextResponse } from "next/server";
// Because nextJS servers run on edge that't why we need to use NextRequest and NextResponse
import  connectDB  from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: NextRequest){
    try {
        

        // Data come in the backend from the front-end can take sometime but it doesn't happens in express
        const {email, password} =  await req.json()

        if(!email || !password) {
            return NextResponse.json({
                error : "Email and password are required",
                
            },{status : 400})
        }

        await connectDB()
        const isExistingUser = await User.findOne(
            {email}
        )
        if(isExistingUser){
            return NextResponse.json({error : "User already registered"} , {status : 400})
        }

        // create the User

         await User.create({
            email,
            password
        })
        return NextResponse.json(
            {message : "User registered successfully"},
            {status : 201}
        )
    } catch (error) {
        return NextResponse.json({error : `Failed to register the user: ${error}`} , {status : 400})
    }
}