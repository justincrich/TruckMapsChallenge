import { ChatMessage, User } from '../util/types'

class ChatClient {
    private messages: ChatMessage[] = [
        {
            message: 'hii',
            userId: 'justinrich2008@gmail.com',
        },
    ]

    private users: Record<string, User> = {
        'justinrich2008@gmail.com': {
            userId: 'justinrich2008@gmail.com',
            name: 'Justin',
        },
    }

    setMessage(message: ChatMessage): void {
        this.messages.push(message)
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

export const chatClient = new ChatClient()
