import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../style/components/Profile.module.css'

export const Profile = () =>{
    const {level} = useContext(ChallengesContext)
    return (
        <div className={styles.profileContainer} >
            <img src="https://github.com/m4rkos.png" alt="Marcos Eduardo"/>
            <div>
                <strong>Marcos Eduardo</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}