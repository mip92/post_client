import {makeAutoObservable} from "mobx";
import PostsService from "../services/PostsService";
import {IPost} from "../models/IPost";

export default class Posts {
    error = ''
    loading=false
    count= 0
    posts=[]as IPost[]
    constructor() {
        makeAutoObservable(this)
    }
    setPosts(posts:IPost[]){
        this.posts=posts
    }
    addPost(post:IPost){
        this.posts=[...this.posts, post]
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
    async fetchPosts(offset:number, limit:number, userId:number){
        try {
            this.setLoading(true)
            const response = await PostsService.fetchPosts(offset, limit, userId)
            this.setPosts(response.data.rows)
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
    async createPost(userId:number, header:string, text:string){
        try {
            this.setLoading(true)
            const response = await PostsService.createPost(userId, header, text)
            this.addPost(response.data)
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