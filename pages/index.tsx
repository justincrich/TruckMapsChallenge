/* eslint-disable no-console */
import React from 'react'
import isEqual from 'lodash/isEqual'
import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { useChatClient } from '../hooks/useChatClient'
import { ChatMessage, User } from '../util/types'
import { SERVER_URL } from '../config/env'
import { initializeStore, buildBaseState } from '../store/index'
import { RootState } from '../store/rootReducer'
import { userClient } from '../clients/UserClient'
import { useUserClient } from '../hooks/useUserClient'

type Props = {
    chatHistory: ChatMessage[]
    initialReduxState: RootState
}

const Home: NextPage<Props> = ({ chatHistory }) => {
    const { userDirectory } = useUserClient()
    const { messages } = useChatClient(chatHistory)

    const chatMessages = messages || chatHistory

    console.log(chatMessages)

    return (
        <Layout>
            <div className="hero">
                <h1 className="title">Welcome to Next!</h1>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(): Promise<{
    props: Props
}> {
    let chatHistory: ChatMessage[] = []

    let userDirectory: Record<string, User> = {}
    try {
        const chatRes = await fetch(`${SERVER_URL}/chat/history`)
        chatHistory = await chatRes.json()
    } catch (e) {
        console.error(e.message)
    }

    try {
        userDirectory = await userClient.getUserDirectory()
    } catch (e) {
        console.error(e.message)
    }

    const reduxStore = initializeStore(
        buildBaseState({
            directory: userDirectory,
        })
    )
    return {
        props: {
            initialReduxState: reduxStore.getState(),
            chatHistory,
        },
    }
}

export default Home
