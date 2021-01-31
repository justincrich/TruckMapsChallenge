import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

const Home = (): JSX.Element => (
    <div>
        <Head title="Home" />
        <Nav />

        <div className="hero">
            <h1 className="title">Welcome to Next!</h1>

            <div className="row">
                <Link href="https://github.com/zeit/next.js#getting-started">
                    <a className="card">
                        <h3>Getting Started &rarr;</h3>
                        <p>
                            Learn more about Next on Github and in their
                            examples
                        </p>
                    </a>
                </Link>
                <Link href="https://github.com/segmentio/create-next-app">
                    <a className="card">
                        <h3>Create Next App &rarr;</h3>
                        <p>
                            Was this tool helpful? Let us know how we can
                            improve it
                        </p>
                    </a>
                </Link>
            </div>
        </div>
    </div>
)

export default Home
