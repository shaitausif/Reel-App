
import { authOptions } from "@/lib/authOptions"
import { getUploadAuthParams } from "@imagekit/next/server"
import { getServerSession } from "next-auth"

export async function GET() {
    try {

        const session = getServerSession(authOptions)
        if(!session){
            return Response.json({error: "Not Authenticated"},{status : 403})
        }
        // Your application logic to authenticate the user
        // For example, you can check if the user is logged in or has the necessary permissions
        // If the user is not authenticated, you can return an error response
    
        const {token, expire, signature} = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
            // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
            // token: "random-token", // Optional, a unique token for request
        })
    
        return Response.json({ token, expire, signature , publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY })
    } catch (error) {
        return Response.json({error : "Authentication for ImageKit failed"},{status : 500})
    }
}