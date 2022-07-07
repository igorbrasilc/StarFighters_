export type Owner = {
    login: string
}

export type User = {
    stargazers_count?: number,
    owner?: Owner,
    username?: string,
    count?: number
}

export type Result = {
    winner: string,
    loser: string,
    draw: boolean
}

export type ResultAndUsers = {
    firstUser: string,
    secondUser: string,
    result: Result
}

export type Query = {
    rows: Rows[]
}

export type Rows = {
    username: string,
    wins: number,
    losses: number,
    draws: number
}