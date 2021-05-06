import {createContext,useState,ReactNode} from "react";

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
    play: (episode: Episode) => void;
    togglePlay: (state: boolean) => void;
    setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({children}: PlayerContextProviderProps){
  const[episodeList,setEpisodeList] = useState([]);
  const[currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const[isPlaying,setIsPlaying] = useState(false)

  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }
  
  function togglePlay(){
    setIsPlaying(!isPlaying);
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
          isPlaying,
          togglePlay,
          setPlayingState}}>
          {children}
      </PlayerContext.Provider>
  )
}
