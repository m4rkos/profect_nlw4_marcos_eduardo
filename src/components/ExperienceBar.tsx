import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../style/components/ExperienceBar.module.css'

export const ExperieceBar = () =>{
    const {currentExperience, experieceToNextLevel} = useContext(ChallengesContext)

    const percentToNextLevel = Math.round((currentExperience * 100) / experieceToNextLevel)

    return (
        <header className={ styles.experienceBar } >
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}></div>
                <span className={ styles.currentExperience } style={{ left: `${percentToNextLevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experieceToNextLevel} xp</span>
        </header>
    )
}