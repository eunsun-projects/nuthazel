"use client";
import React, { createContext, useContext, useState } from "react";

const AudioContext = createContext<{
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isPlaying: false,
  setIsPlaying: () => {},
});

export function useAudio() {
  return useContext(AudioContext);
}

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};
