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
    play: (episode: Episode) => void
}

export const PlayerContext = createContext({} as PlayerContextData)
