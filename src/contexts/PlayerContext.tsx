import {createContext,useState,ReactNode, useContext} from "react";

type Episode = {
    title: string;
    members: string;
    duration: number;
    url: string;
    thumbnail: string
}

type PlayerContextProviderProps = {
    children: ReactNode;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: (state: boolean) => void;
    setPlayingState: (state: boolean) => void;
    nextEpisode: () => void;
    previousEpisode: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerState: () => void

}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({children}: PlayerContextProviderProps){
  const[episodeList,setEpisodeList] = useState([]);
  const[currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const[isPlaying,setIsPlaying] = useState(false);
  const[isLooping, setIsLooping] = useState(false);
  const[isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }
  
  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function toggleLoop(){
    setIsLooping(!isLooping)
  }
  function toggleShuffle(){
    setIsShuffling(!isShuffling)
  }
  function nextEpisode(){
      if(isShuffling){
        const nexEpisodeRandom = Math.floor(Math.random() * episodeList.length);
        setCurrentEpisodeIndex(nexEpisodeRandom);
      }
      else {
        const nextEpisodeIndex = currentEpisodeIndex + 1;

      if(nextEpisodeIndex < episodeList.length){
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }   
    }
  }
  function previousEpisode(){
      if(currentEpisodeIndex > 0){
          setCurrentEpisodeIndex(currentEpisodeIndex - 1)
      }
  }
  

  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);

  }

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }
  return(
      <PlayerContext.Provider 
      value={{
          episodeList, 
          currentEpisodeIndex,
          play,
          playList,
          isPlaying,
          isLooping,
          isShuffling,
          toggleShuffle,
          nextEpisode,
          previousEpisode,
          togglePlay,
          toggleLoop,
          clearPlayerState,
          setPlayingState}}>
          {children}
      </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}
