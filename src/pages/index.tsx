import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperieceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengeBox } from '../components/ChallengeBox'
import { ChallengesProvider } from '../contexts/ChallengeContext'

import Head from 'next/head'
import { GetServerSideProps } from 'next'

import styles from '../style/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'

interface HomeProps {
  level: number
  currentExperience: number
  challengeCompleted: number
}

export default function Home(props: HomeProps) {    
  return (
    <ChallengesProvider 
      level={props.level}  
      currentExperience={props.currentExperience}
      challengeCompleted={props.challengeCompleted}
      >
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
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengeCompleted } = ctx.req.cookies
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted),
    }
  }
}