import { useEffect, useState } from 'react'
import styles from '../style/components/Countdown.module.css'

export const Countdown = () => {

    const [time, setTime] = useState(25 * 60)
    const [active, setActive] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    const startCoundDown = () => {
        setActive(true)
    }

    useEffect(() => {
        if (active && time > 0){
            setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
    }, [active, time])

    return (
        <div>
            <div className={styles.CountdownContainer} >
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            <button 
                type="button" 
                className={styles.countdownButton}
                onClick={startCoundDown}
            >Iniciar um ciclo</button>
        </div>
    )
}