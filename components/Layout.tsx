import React from 'react'
import NextHead from 'next/head'
import styled, { createGlobalStyle } from 'styled-components'
import { reset } from '../styles/reset'
import { ThemeProvider } from '../styles/ThemeProvider'
import { theme } from '../styles/theme'
import { color } from '../styles'

type Props = {
    children: JSX.Element | JSX.Element[]
    className?: string
}

const GlobalStyles = createGlobalStyle`
  ${reset}
`

const Head = (): JSX.Element => (
    <>
        <NextHead>
            <title>Justin Rich Truckmap</title>
        </NextHead>
    </>
)

export const Layout = ({ className, children }: Props): JSX.Element => {
    return (
        <Container className={className}>
            <Head />
            <ThemeProvider theme={theme}>
                <>
                    <GlobalStyles />
                    {children}
                </>
            </ThemeProvider>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-width: 320px;
    height: 100%;
    background-color: ${color.background.app};
    display: flex;
    flex-flow: row nowrap;
    flex: 1 1 auto;
`
