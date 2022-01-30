import {User} from "../models/response/UserResponse";
import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthSwevice";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import UserService from "../services/UserService";

export default class Users {
    users = [] as IUser[]
    error = ''
    loading=false
    count= 0
    constructor() {
        makeAutoObservable(this)
    }
    setUsers(users:IUser[]){
        this.users=users
    }
    setCount(count:number){
        this.count=count
    }
    setError(error:string){
        this.error=error
    }
    setLoading(bool:boolean){
        this.loading=bool
    }
    async fetchUsers(offset:number, limit:number){
        try {
            this.setLoading(true)
            const response = await UserService.fetchUsers(offset, limit)
            this.setUsers(response.data.rows)
            this.setCount(response.data.count)
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