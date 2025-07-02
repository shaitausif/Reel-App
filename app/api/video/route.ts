// This file is for getting and posting videos

import { authOptions } from "@/lib/authOptions";
import ConnectDB from "@/lib/db";
import User from "@/models/user.model";
import Video, { IVideo } from "@/models/video.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    // All the logged in and non Logged in users can see the video records
    try {
        await ConnectDB()

        // It tells Mongoose to skip creating full Mongoose documents, and instead return plain JavaScript objects.
        const videos = await Video.find().sort({createdAt: -1}).lean()

        if(!videos || videos.length == 0){
            
            return NextResponse.json([], {status : 200})
        }

        return NextResponse.json(videos, {status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "Failed to fetch videos"},{status : 500})        
        
    }
}

// Only logged in Users can upload the videos 

export async function POST(req: NextRequest, res: NextResponse){
    try {
        // I will use the sessions to authenticate the user which i gave when user logged in in next-atuh
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error : "Unauthorized"},{status : 401})
        }
        
        await ConnectDB()
        const body: IVideo = await req.json()

        if(
            !body.title || !body.description || !body.videoUrl || !body.thumbnailUrl
        ){
            return NextResponse.json(
                {error : "Missing required field"},
                {status : 400}
            )
        }
        const videoData = {
            ...body,
            controls : body.controls ?? true,
            transformation: {
                height : 1920,
                width : 1080,
                quality : body.transfomation?.quality ?? 100    
            }
        }

        const newVideo = await Video.create(videoData)

        return NextResponse.json(
            newVideo,
            {status : 201}
        )

    } catch (error) {
        return NextResponse.json(
            {error : "Failed to create video"},
            {status : 500}
        )
    }
}