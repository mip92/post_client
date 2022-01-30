export interface User{
    id: number,
    email: string,
    role: string,
    name: string,
    createdAt: string,
    updatedAt: string
}
export interface UserResponse {
    count: number,
    rows: User[]
}