import React from 'react'
import Head from 'next/head'
import { Footer, Navbar,Menubar,Menubar2 } from '../components'

const Layout = ({children}) => {
  return (
    <div className='layout'>
        <Head>
        <link rel='icon' href='shopifylogo.jpg'></link>
            <title>H.A clothing</title>
        </Head>
        <header>
            <Navbar />
        </header>
        <main className='main-container'>
       
            {children}
        </main>
        <footer>
           {/*<Menubar2/>*/}
            <Footer />
        </footer>
    </div>
  )
}

export default Layout