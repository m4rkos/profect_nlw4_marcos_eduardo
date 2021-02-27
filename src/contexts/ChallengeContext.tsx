import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengesContextData {
    level: number,
    currentExperience: number,
    challengeCompleted: number,
    experieceToNextLevel: number,
    activeChallenge: Challenge,    
    levelUp: () => void,
    startNewChallenger: () => void, 
    resetChallenge: () => void,   
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
}

interface ChallengesProviderProps {
    children: ReactNode
    level: number
    currentExperience: number
    challengeCompleted: number
}

export const ChallengesContext = createContext( {} as ChallengesContextData )

export const ChallengesProvider = ({ 
        children, ...rest 
    }: ChallengesProviderProps) => {    
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0)
  
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experieceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengeCompleted', String(challengeCompleted))
    }, [level, currentExperience, challengeCompleted])

    const levelUp = () => {
      setLevel(level + 1)
      setIsLevelUpModalOpen(true)
    }

    const closeLevelUpModal = () => {
        setIsLevelUpModalOpen(false)
    }

    const startNewChallenger = () => {
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengesIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`,
                silent: true                
            })
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then( (permission) => {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    let notification = new Notification('Novo desafio 🎉', {
                        body: `Valendo ${challenge.amount}xp!`,
                        silent: true
                    })
                    console.log(notification)
                }
            })
        }
    }

    const resetChallenge = () => {
        setActiveChallenge(null)
    }
    
    const completeChallenge = () => {
        if(!activeChallenge){
            return
        }

        const { amount } = activeChallenge
        let finalExperience = currentExperience + amount

        if(finalExperience >= experieceToNextLevel){
            finalExperience = finalExperience - experieceToNextLevel
            levelUp()
        }        

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengeCompleted(challengeCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={
            { 
                level,
                currentExperience,
                challengeCompleted,
                activeChallenge,
                experieceToNextLevel,
                levelUp,
                startNewChallenger,
                resetChallenge,   
                completeChallenge, 
                closeLevelUpModal,                            
            }
        }>
            {children}

            { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>
    )
}