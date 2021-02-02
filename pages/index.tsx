/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { useChatClient } from '../hooks/useChatClient'
import { ChatMessage, User } from '../util/types'
import { SERVER_URL } from '../config/env'
import { initializeStore, buildBaseState } from '../store/index'
import { RootState } from '../store/rootReducer'
import { userClient } from '../clients/UserClient'
import { useUserClient } from '../hooks/useUserClient'
import { SignupModal } from '../components/SignupModal'

type Props = {
    chatHistory: ChatMessage[]
    initialReduxState: RootState
}

const Home: NextPage<Props> = ({ chatHistory }) => {
    const { userDirectory, you } = useUserClient()
    const { messages } = useChatClient(chatHistory)

    const chatMessages = messages || chatHistory

    console.log(chatMessages)

    return (
        <Layout>
            <h1 className="title">Chat App</h1>
            {!you ? <SignupModal /> : <div />}
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
