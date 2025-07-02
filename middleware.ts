import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(){
        return NextResponse.next() // Allow request to continue
    },
    {
        callbacks : {
            authorized({req, token}){
                // logic to allow or block
                // if(token) return true; // If there's a token then user is authenticated
                const {pathname} = req.nextUrl
                if(token){
                    if(pathname.startsWith("/login") || pathname.startsWith("/register")){
                        return false
                    }
                    return true
                }
                if(
                    (
                    pathname.startsWith("/api/auth") || 
                    pathname.startsWith("/api/video") ||
                    pathname.startsWith("/login") || 
                    pathname.startsWith("/register") 
                    )
                ){
                    return true //  These paths are accessible without even having a token
                }
                if(
                    pathname.startsWith("/") || pathname.startsWith('/api/videos')
                ){
                    return true
                }

                // by using this '!!' this token will be converted into boolean form
                return !!token
                
            }
        }
    }
)


// Specifying the files on which the middleware should run 
export const config = {
    matcher : [
        /*
        Match all request paths except:
        _next/static(static files)
        _next/image(image optimization file)
        favicon.ico
        public folder

        */
       "/((?!_next/static|_next/image|favicon.ico|public/).*)"
            ]
}