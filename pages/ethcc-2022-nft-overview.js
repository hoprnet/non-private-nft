import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import getSvg from "../components/svgGenerator/scoreboard";
import World from '../assets/maps/world-HighRez-Mercator.svg'
//import World from '../assets/maps/worldHigh-Mercator.svg'

import SVG, { Props as SVGProps } from 'react-inlinesvg';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HOPR | Non Private NFT</title>
        <meta name="description" content="Non Private NFT by HOPR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className={styles.h2}>Non-Private NFT Minter</h2>
      <p className={styles.p}>
      The HOPR Non-Private NFT! This NFT tool will show you how easy it is to expose your IP address and maybe even your whole identity with many of today`s crypto services.
      </p>
      <main className={styles.overview}>
        <div>
          <img src="/ethcc-2022-nft-demo.jpg" alt="Non Private NFT by HOPR - EthCC 5 2022 Paris" />
        </div>
      </main>
    </div>
  )
}
