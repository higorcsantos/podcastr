import { useContext,useEffect,useRef } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export function Player(){
    const {currentEpisodeIndex,
           episodeList,
           isPlaying,
           togglePlay,
           setPlayingState} = useContext(PlayerContext);

    useEffect(() => {
        if(!audioRef.current){
            return;
        }else if(isPlaying){
            audioRef.current.play()
        }else{
            audioRef.current.pause()
        }
    }, [isPlaying])
    
    const audioRef = useRef<HTMLAudioElement>(null)
    const episode = episodeList[currentEpisodeIndex];

    return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/HeadPhone.svg"/>
                <strong>Tocando Agora</strong>
            </header>
            {episode ?(
                    <div className={styles.currentEpisode}>
                        <Image 
                        width={592} 
                        height={592} 
                        src={episode.thumbnail}
                        objectFit="cover"/>
                        <strong>{episode.title}</strong>
                        <span>{episode.members}</span>
                    </div>
                ) 
                :
                (
                    <div className={styles.emptyPlayer}>
                        <strong>Selecione um podcast para ouvir</strong>            
                    </div>
                )}
            
            <footer className={!episode ? styles.empty : ""}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider 
                            trackStyle={{background:"#04d361"}}
                            railStyle={{background: "#9f75ff"}}
                            handleStyle={{color:"#04d361", border: 4}}
                            />
                        ):(
                            <div className={styles.emptySlider}/>
                        )}
                    </div>
                    <span>00:00</span>
                </div>
                {episode && (
                    <audio
                    src={episode.url}
                    ref={audioRef}
                    autoPlay
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}/>
                ) }
                <div className={styles.buttons}>
                    <button type='button' disabled={!episode}>
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button type='button' disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar Anterior"/>
                    </button>
                    <button type='button' 
                    disabled={!episode} 
                    className={styles.playButton}
                    onClick={() => togglePlay(false)}>
                        {isPlaying 
                        ? <img src="/pause2.svg" alt="Apertar o play"/>
                        : <img src="/play.svg" alt="Apertar o play"/> }
                    </button>
                    <button type='button' disabled={!episode}>
                        <img src="/play-next.svg" alt="Tocar próximo"/>
                    </button>
                    <button type='button' disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
            </footer>
        </div>
    )
}