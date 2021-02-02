import React from 'react'
import NextHead from 'next/head'
import styled, { createGlobalStyle } from 'styled-components'
import { reset } from '../styles/reset'
import { color } from '../styles'

type Props = {
    children: JSX.Element | JSX.Element[]
    className?: string
}

const GlobalStyles = createGlobalStyle`
  ${reset}
  html, body, #__next{

      width: 100vw;
      height: 100vh;
      display: flex;
      flex: 1 1 auto;
  }
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
            <GlobalStyles />
            {children}
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
    position: relative;
`
