export type Owner = {
    login: string
}

export interface User {
    stargazers_count?: number,
    owner?: Owner,
    username?: string,
    count?: number
}

export interface Result {
    winner: string,
    loser: string,
    draw: boolean
}

export type ResultAndUsers = {
    firstUser: string,
    secondUser: string,
    result: Result
}

// export interface UserRepo {
//     name?: string,
//     stargazers_count: number,
//     owner: Owner,

// }

export type Query = {
    rows: Rows[]
}

export interface Rows {
    id?: number,
    username: string,
    wins: number,
    losses: number,
    draws: number
}