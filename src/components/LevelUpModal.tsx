import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../style/components/LevelUpModal.module.css'

export const LevelUpModal = () => {
    const { level, closeLevelUpModal } = useContext(ChallengesContext)

    return(        
        <div className={styles.overlay} >
            <div className={styles.levelUpModalContainer}>
                
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar Modal" />
                </button>

            </div>
        </div>
    )
}