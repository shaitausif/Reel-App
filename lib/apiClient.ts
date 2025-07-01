import { IVideo } from "@/models/video.model"

type FetchOptions = {
    method? : "GET" | "POST" | "PUT" | "DELETE"
    body? : any
    headers? : Record<string, string>
}

export type videoFormData = Omit<IVideo, "_id">

class ApiClient {
    private async fetch<T>(
        endpoint : string,
        options : FetchOptions = {}
    ) 
    : Promise<T>{
        const {method = "GET" , body, headers = {}} = options
        const defaultHeaders = {
            "Content-Type" : "application/json",
            ...headers
        }

        const response: any = await this.fetch(`/api${endpoint}`,{
            method,
            headers: defaultHeaders,
            body : body ? JSON.stringify(body) : undefined
        })
        
        if(!response.ok){
            throw new Error(await response.text())
        }
        return await response.json()
    }

    async getVideos() {
        return await this.fetch("/video")
    }

    async createVideo(videoData: videoFormData){
        return await this.fetch("/video",{
            method : "POST",
            body : videoData,
        })
    }
}


export const apiClient = new ApiClient()