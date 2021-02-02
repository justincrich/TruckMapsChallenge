import { AppInitialProps, AppContext } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '../styles/ThemeProvider'
import { theme } from '../styles/theme'
import { useStore } from '../store/index'

export default function App(props: AppContext & AppInitialProps): JSX.Element {
    const { Component, pageProps } = props
    const store = useStore(pageProps.initialReduxState)
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}

App.getInitialProps = async ({
    Component,
    ctx,
}: AppContext): Promise<AppInitialProps> => {
    let pageProps = {}

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
}
