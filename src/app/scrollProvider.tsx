"use client";

import React, { createContext, useContext, useRef, ReactNode } from "react";

interface ScrollContextType {
    registerRef: (key: string, ref: React.RefObject<HTMLDivElement>) => void;
    scrollToSection: (key: string) => void;
}

const ScrollContext = createContext<ScrollContextType>({
    registerRef: () => {},
    scrollToSection: () => {},
});

export const useScroll = () => useContext(ScrollContext);

export default function ScrollProvider({ children }: { children: ReactNode }) {
    const refs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});

    const registerRef = (key: string, ref: React.RefObject<HTMLDivElement>) => {
        refs.current[key] = ref;
    };

    const scrollToSection = (key: string) => {
        refs.current[key]?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <ScrollContext.Provider value={{ registerRef, scrollToSection }}>
            {children}
        </ScrollContext.Provider>
    );
}
