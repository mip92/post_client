import {AxiosResponse} from "axios";
import $api from "../http";
import {NewPostResponse} from "../models/response/NewPostResponse";

export default class NewPostService {
    static async createPost (userId:number, header:string, text:string):Promise<AxiosResponse<NewPostResponse>>{
        return  $api.post<NewPostResponse>(`/post`, {userId, header, text})
    }
}