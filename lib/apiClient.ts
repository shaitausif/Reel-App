import { IVideo } from "@/models/video.model"

type FetchOptions = {
    method? : "GET" | "POST" | "PUT" | "DELETE"
    body? : any
    headers? : Record<string, string>
}

export type videoFormData = Omit<IVideo, "_id">


class ApiClient {
  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  }

  async getVideos() {
    return await this.request<IVideo[]>("/video");
  }

  async createVideo(videoData: videoFormData) {
    return await this.request("/video", {
      method: "POST",
      body: videoData,
    });
  }
}

export const apiClient = new ApiClient();
