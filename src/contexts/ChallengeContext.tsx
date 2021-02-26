import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import challenges from '../../challenges.json'

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
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext( {} as ChallengesContextData )

export const ChallengesProvider = ({ children }: ChallengesProviderProps) => {    
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(10)
    const [challengeCompleted, setChallengeCompleted] = useState(0)
  
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experieceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    const levelUp = () => {
      setLevel(level + 1)
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
            finalExperience = finalExperience - experieceToNextLevel;
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
            }
        }>
            {children}
        </ChallengesContext.Provider>
    )
}