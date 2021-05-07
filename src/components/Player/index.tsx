import { useContext,useEffect,useRef, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";
import Image from "next/image";
import Head from "next/head"
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

export function Player(){
    const {currentEpisodeIndex,
           episodeList,
           isPlaying,
           togglePlay,
           setPlayingState,
           nextEpisode,
           previousEpisode,
           isLooping,
           toggleLoop,
           toggleShuffle,
           isShuffling,
           clearPlayerState
           } = useContext(PlayerContext);
        
    const [progress,setProgress] = useState(0);

    useEffect(() => {
        if(!audioRef.current){
            return;
        }else if(isPlaying){
            audioRef.current.play()
        }else{
            audioRef.current.pause()
        }
    }, [isPlaying]);

    function setupProgressListener(){
        audioRef.current.currentTime = 0;
        audioRef.current.addEventListener("timeupdate", () => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    };
    function handleSeek(amount: number){
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodeEnded(){
        const hasNext = (currentEpisodeIndex + 1 ) < episodeList.length;
        const hasPrevious = isShuffling || currentEpisodeIndex > 0;
    
        if(hasNext){
          nextEpisode()
        }else {
            clearPlayerState()
        }
      }
    
    
    const audioRef = useRef<HTMLAudioElement>(null)
    const episode = episodeList[currentEpisodeIndex];

    return(
        
        <div className={styles.playerContainer}>
            <Head>
                <title>Podcastr | Home</title>
            </Head>
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
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider 
                            onChange={handleSeek}
                            max={episode.duration}
                            value={progress}
                            trackStyle={{background:"#04d361"}}
                            railStyle={{background: "#9f75ff"}}
                            handleStyle={{color:"#04d361", border: 4}}
                            />
                        ):(
                            <div className={styles.emptySlider}/>
                        )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>
                {episode && (
                    <audio
                    src={episode.url}
                    ref={audioRef}
                    autoPlay
                    onEnded={handleEpisodeEnded}
                    loop={isLooping}
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}
                    onLoadedMetadata={setupProgressListener}/>
                ) }
                <div className={styles.buttons}>
                    <button type='button' disabled={!episode || episodeList.length === 1}>
                        <img src="/shuffle.svg" 
                        alt="Embaralhar"
                        onClick={toggleShuffle}
                        className={isShuffling ? styles.isActive : ''}/>
                    </button>
                    <button type='button' 
                    disabled={!episode}
                    onClick={previousEpisode}>
                        <img src="/play-previous.svg" alt="Tocar Anterior" />
                    </button>
                    <button type='button' 
                    disabled={!episode} 
                    className={styles.playButton}
                    onClick={() => togglePlay(false)}>
                        {isPlaying 
                        ? <img src="/pause2.svg" alt="Apertar o play"/>
                        : <img src="/play.svg" alt="Apertar o play"/> }
                    </button>
                    <button type='button' disabled={!episode}
                    onClick={nextEpisode}>
                        <img src="/play-next.svg" 
                        alt="Tocar próximo"
                        />
                    </button>
                    <button type='button' 
                    disabled={!episode}
                    onClick={toggleLoop}
                    className={isLooping ? styles.isActive : ''}>
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
            </footer>
        </div>
    )
}