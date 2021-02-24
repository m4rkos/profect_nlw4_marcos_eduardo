import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperieceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'

import Head from 'next/head'

import styles from '../style/pages/Home.module.css'

export default function Home() {
  return (
    <div className={ styles.container }>      
      <Head>
        <title>Início | Move.it</title>
      </Head>

      <ExperieceBar />
      
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}
