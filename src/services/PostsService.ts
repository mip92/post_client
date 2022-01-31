import {AxiosResponse} from "axios";
import $api from "../http";
import {PostsResponse} from "../models/response/PostsResponse";
import {IPost} from "../models/IPost";

export default class PostsService {
    static async fetchPosts(offset:number, limit:number, userId: number):Promise<AxiosResponse<PostsResponse>>{
        return  $api.get<PostsResponse>(`/post?offset=${offset}&limit=${limit}&userId=${userId}`)
    }
    static async createPost (userId:number, header:string, text:string):Promise<AxiosResponse<IPost>>{
        return  $api.post<IPost>(`/post`, {userId, header, text})
    }
}