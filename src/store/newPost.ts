import {User} from "../models/response/UserResponse";
import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthSwevice";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import UserService from "../services/UserService";
import NewPostService from "../services/NewPostService";

export default class NewPost {
    error = ''
    loading=false
    constructor() {
        makeAutoObservable(this)
    }
    setError(error:string){
        this.error=error
    }
    setLoading(bool:boolean){
        this.loading=bool
    }
    async createPost(userId:number, header:string, text:string){
        try {
            this.setLoading(true)
            /*const response = */await NewPostService.createPost(userId, header, text)
/*            this.setUsers(response.data.rows)
            this.setCount(response.data.count)*/
        }catch (e:any) {
            if (e.response.data.message) this.setError(e.response.data.message);
            else this.setError(e.message);
            setTimeout(async () => {
                this.setError('')
            }, 2000)
        } finally {
            this.setLoading(false)
        }
    }
}