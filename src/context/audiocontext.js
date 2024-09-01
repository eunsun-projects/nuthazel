"use client"
import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export function useAudio() {
    return useContext(AudioContext);
}

export const AudioProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <AudioContext.Provider value={{ isPlaying, setIsPlaying }}>
            {children}
        </AudioContext.Provider>
    );
};