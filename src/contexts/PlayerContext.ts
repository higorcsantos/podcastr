import {createContext} from "react";

type Episode = {
    title: string;
    members: string;
    duration: number;
    url: string;
    thumbnail: string
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    togglePlay: (state: boolean) => void;
    setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData)
