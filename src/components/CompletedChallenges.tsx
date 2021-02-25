import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../style/components/CompletedChallenges.module.css'

export const CompletedChallenges = () => {
    const { challengeCompleted } = useContext(ChallengesContext)
    return (
        <div className={ styles.CompletedChallengesContainer } >
            <span>Desafios coompletos</span>
            <span>{challengeCompleted}</span>
        </div>
    )
}