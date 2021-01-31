import React from 'react'
import NextHead from 'next/head'
import styled, { createGlobalStyle } from 'styled-components'
import { reset } from '../styles/reset'
import { ThemeProvider } from '../styles/ThemeProvider'
import { theme } from '../styles/theme'

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

const Container = styled.div``
