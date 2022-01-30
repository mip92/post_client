import {User} from "../models/response/UserResponse";
import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthSwevice";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

export default class Login {
    user = {} as IUser
    isAuth = false
    error = ''
    loading=false
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }
    setUser(user:IUser){
        this.user=user
    }
    setError(error:string){
        this.error=error
    }
    setLoading(bool:boolean){
        this.loading=bool
    }
    async login(email:string, password:string){
        try {
            this.setLoading(true)
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
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
    async registration(name:string,email:string, password:string){
        try {
            this.setLoading(true)
            const response = await AuthService.registration(email, password, name)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
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
    async logout(){
        try {
            this.setLoading(true)
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
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
    async checkAuth(){
        try {
            this.setLoading(true)
            const response =await axios.get<AuthResponse>(
                `${process.env.REACT_APP_SERVER_URL}/api/login/refresh`,
                {withCredentials:true}
            )
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
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