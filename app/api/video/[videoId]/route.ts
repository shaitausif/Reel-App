import ConnectDB from "@/lib/db";
import { authOptions } from "@/lib/authOptions";
import Video, { IVideo } from "@/models/video.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, {params}: {params: {videoId: string}}){
    try {
        const {videoId} = params
        await ConnectDB();
        const video = await Video.findById(videoId)
        
        if(!video){
            return Response.json({error: "No Video Found"}, {status : 404})
        }
        return Response.json(video,{status: 200})
    } catch (error) {
        return Response.json({error: `Unable to fetch the Video,${error}`}, {status : 500})
    }
}