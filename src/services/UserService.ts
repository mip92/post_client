import {AxiosResponse} from "axios";
import $api from "../http";
import {UserResponse} from "../models/response/UserResponse";

export default class UserService {
    static async fetchUsers(offset:number, limit:number):Promise<AxiosResponse<UserResponse>>{
        return  $api.get<UserResponse>(`/user?offset=${offset}&limit=${limit}`)
    }
}