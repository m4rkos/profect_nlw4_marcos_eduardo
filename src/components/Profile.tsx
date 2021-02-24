import styles from '../style/components/Profile.module.css'

export const Profile = () =>{
    return (
        <div className={styles.profileContainer} >
            <img src="https://github.com/m4rkos.png" alt="Marcos Eduardo"/>
            <div>
                <strong>Marcos Eduardo</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>
        </div>
    )
}