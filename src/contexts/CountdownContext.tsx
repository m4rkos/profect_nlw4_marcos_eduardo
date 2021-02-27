import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengeContext'

interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCoundDown: () => void,
    resetCountdown: () => void,
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeOut: NodeJS.Timeout

export const CountdownProvider = ({children}: CountdownProviderProps) => {
    const { startNewChallenger } = useContext(ChallengesContext)
    
    const [time, setTime] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const resetCountdown = () => {
        clearTimeout(countdownTimeOut)
        setIsActive(false)
        setHasFinished(false)
        setTime(25 * 60)
    }
    const startCoundDown = () => {
        setIsActive(true)
    }

    useEffect(() => {
        if (isActive && time > 0){
            countdownTimeOut = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenger()
            //resetCountdown()
        }
    }, [isActive, time])
    
    return (
        <CountdownContext.Provider value={
            {
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCoundDown,
                resetCountdown,
            }
        }>
            {children}
        </CountdownContext.Provider>
    )
}