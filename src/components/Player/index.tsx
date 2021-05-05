import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";

export function Player(){
    const {currentEpisodeIndex,episodeList} = useContext(PlayerContext);

    const episode = episodeList[currentEpisodeIndex];

    return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/HeadPhone.svg"/>
                <strong>Tocando Agora</strong>
            </header>
            {episode ?
                (
                    <div className={styles.currentEpisode}>

                    </div>
                ) 
                :
                (
                    <div className={styles.emptyPlayer}>
                        <strong>Selecione um podcast para ouvir</strong>            
                    </div>
                )}
            
            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider}/>
                    </div>
                    <span>00:00</span>
                </div>
                <div className={styles.buttons}>
                    <button type='button'>
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button type='button'>
                        <img src="/play-previous.svg" alt="Tocar Anterior"/>
                    </button>
                    <button type='button'>
                        <img src="/play.svg" alt="Apertar o play"/>
                    </button>
                    <button type='button'>
                        <img src="/play-next.svg" alt="Tocar próximo"/>
                    </button>
                    <button type='button'>
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
            </footer>
        </div>
    )
}