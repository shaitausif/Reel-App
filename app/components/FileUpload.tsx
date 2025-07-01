"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps{
    onSuccess : (res: any) => void,
    onProgress? : (progress: number) => void,
    fileType? : "image" | "video"

}

const FileUpload = ({
    onSuccess ,
    onProgress,
    fileType
}: FileUploadProps) => {

    const [isUploading, setisUploading] = useState(false)
    const [error, seterror] = useState("")

    // Optional validation 
    const validateFile = (file: File) => {
        if(fileType === "video"){
            if(!file.type.startsWith("video/")){
                seterror("Please upload a valid video file")
                return;
            }
        }
        if(file.size > 100 * 1024 * 1024){
            
            seterror("File size must be less than 100 MB")
            return;
        }
        return true
    }


  

    /**
     * Authenticates and retrieves the necessary upload credentials from the server.
     *
     * This function calls the authentication API endpoint to receive upload parameters like signature,
     * expire time, token, and publicKey.
     *
     * returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
     * throws {Error} Throws an error if the authentication request fails.
     */

    


    /**
     * Handles the file upload process.
     *
     * This function:
     * - Validates file selection.
     * - Retrieves upload authentication credentials.
     * - Initiates the file upload via the ImageKit SDK.
     * - Updates the upload progress.
     * - Catches and processes errors accordingly.
     */
    
    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
   
            const file = e.target.files?.[0]
            if(!file || !validateFile(file))  return;
               
            setisUploading(true)
            seterror("")

            try {
                const res = await fetch("/api/auth/imagekit-auth")
                if(!res.ok) {
                    console.log("Unauthorized")
                    return
                }
                const data = await res.json()

                const uploadResponse = await upload({
                // Authentication parameters
                fileName: file.name,
                file,
                expire: data.expire,
                token: data.token,  
                signature: data.signature,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                
                 // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    if(event.lengthComputable && onProgress){
                        const percent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percent))
                    }
                
                
            }});
            onSuccess(uploadResponse)
            console.log("Upload response:", uploadResponse);
            } catch (error) {
                console.error("Upload failed",error)
                
            }finally{
                setisUploading(false)
                seterror("")
            }
    }


    return (
        <>
            <input type="file"
            className='px-2 py-1 outline-none border duration-200 border-gray-500 rounded-lg focus:border-gray-300'  
            accept={fileType === 'video' ? "video/*" : "image/*"}
            onChange={handleFileChange}
            />
            {
                isUploading && (
                    <span>Loading...</span>
                )
            }
           
        </>
    );
};

export default FileUpload;