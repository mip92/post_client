import {IPost} from "../IPost";

export interface PostsResponse {
    count: number,
    rows: IPost[]
}