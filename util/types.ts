export type ChatMessage = {
    message: string
    userId: string
    createdAt: number
    id: string
}

export type User = { userId: string; name: string }

export type UserDirectory = Record<string, User>
