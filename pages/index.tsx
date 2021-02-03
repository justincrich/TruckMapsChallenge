/* eslint-disable no-console */
import React, { useEffect, useRef } from 'react'
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
import { ChatInput } from '../components/ChatInput'
import { SPACING } from '../styles/mixins/constants'
import { Spacer } from '../components/Spacer'
import { ChatEntry } from '../components/ChatEntry'
import { ChatDirectory } from '../components/ChatDirectory'

type Props = {
    chatHistory: ChatMessage[]
    initialReduxState: RootState
}

const Home: NextPage<Props> = ({ chatHistory: initialMessages }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const { userDirectory, you } = useUserClient()
    const { messages, send } = useChatClient({
        initialMessages,
    })

    useEffect(() => {
        if (scrollRef.current) {
            const { scrollHeight } = scrollRef.current
            scrollRef.current.scrollTop = scrollHeight
        }
    }, [messages.length])
    return (
        <Layout>
            <Container>
                <Header>
                    <h1 className="title">Chat App</h1>
                    <Spacer vertical size={2} />
                    <ChatDirectory directory={userDirectory} />
                </Header>
                {!you ? <SignupModal /> : <div />}
                <Body ref={scrollRef}>
                    <MessageContainer>
                        {messages.map((entry) => (
                            <ChatEntry
                                isYou={you?.userId === entry.userId}
                                name={
                                    userDirectory[entry.userId]?.name ||
                                    entry.userId
                                }
                                message={entry.message}
                            />
                        ))}
                    </MessageContainer>
                </Body>
                <Footer>
                    <ChatInput
                        onSubmit={(nextMessage) => {
                            send(you.userId, nextMessage)
                        }}
                    />
                    <Spacer vertical size={3} />
                </Footer>
            </Container>
        </Layout>
    )
}

const Container = styled.div`
    padding: ${SPACING[2]};
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    position: relative;
`

const Body = styled.div`
    overflow: auto;
    display: flex;
    justify-content: center;
    flex: 1 1 auto;
`

const Header = styled.div`
    position: fixed;
    left: 8px;
    top: 8px;
`

const MessageContainer = styled.div`
    display: flex;
    max-width: 500px;
    width: 100%;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    min-height: 0px;
    ${ChatEntry.Container} {
        margin-bottom: ${SPACING[1]};
    }
    ${ChatEntry.Container}:last-child {
        padding-bottom: 100px;
    }
`

const Footer = styled.div`
    width: 100%;
    bottom: 0;
    position: absolute;
    padding: ${SPACING[1]};
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    ${ChatInput.Input} {
        max-width: 500px;
        width: 100%;
    }
`

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
