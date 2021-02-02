export type ChatMessage = {
    message: string
    userId: string
}

export type User = { userId: string; name: string }

export type UserDirectory = Record<string, User>
