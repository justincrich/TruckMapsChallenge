import { ChatMessage, User } from '../util/types'

class ChatDB {
    private messages: ChatMessage[] = []

    private users: Record<string, User> = {}

    setMessage(message: ChatMessage): void {
        this.messages.push(message)
        console.log(this.messages)
    }

    getAllMessages(): ChatMessage[] {
        return this.messages
    }

    getAllUsers(): Record<string, User> {
        return this.users
    }

    getUser(id: string): User {
        if (!this.users[id]) throw new Error('User does not exist')
        return this.users[id]
    }

    setUser(user: User): void {
        this.users[user.userId] = user
    }
}

export const chatDb = new ChatDB()
