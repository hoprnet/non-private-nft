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

      <main className={styles.main}>
        {/* <img src="/api/nft" alt="Non Private NFT by HOPR" />
        <img src="/api/nft.svg" alt="Non Private NFT by HOPR" /> */}
        <div>
         <img src="/api/nft.jpg" alt="Non Private NFT by HOPR" />
        </div>
        {/* <SVG src={`/api/nft.svg`}  /> */}
        {/* <SVG src={`/api/nft.svg`} width="353" height="503" /> */}
        
        {/* <div><SVG src={`/ethcc-2022-nft-demo.svg`} width="585" height="803" /></div> */}
        <div>
          <img src="/ethcc-2022-nft-demo.jpg" alt="Non Private NFT by HOPR - EthCC 5 2022 Paris" />
        </div>
      </main>
    </div>
  )
}
