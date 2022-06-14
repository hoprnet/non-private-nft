import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import getSvg from "../components/svgGenerator";

import SVG, { Props as SVGProps } from 'react-inlinesvg';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Non Private NFT</title>
        <meta name="description" content="Non Private NFT by HOPR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <img src="/api/nft" alt="Vercel Logo" />
        <img src="/api/nft.svg" alt="Vercel Logo" /> */}
        <img src="/api/nft.svg.jpg" alt="Vercel Logo" />
        <SVG src={`/api/nft.svg`} width="320" height="453" />
      </main>
      
      {/* <footer className={styles.footer}>

      </footer> */}
    </div>
  )
}
