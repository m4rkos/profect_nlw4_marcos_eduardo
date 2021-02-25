import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperieceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengeBox } from '../components/ChallengeBox'

import Head from 'next/head'

import styles from '../style/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'

export default function Home() {
  return (
    <div className={ styles.container }>      
      <Head>
        <title>Início | Move.it</title>
      </Head>

      <ExperieceBar />
      
      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}
