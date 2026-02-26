"use client";

import React, { createContext, useContext, useRef, ReactNode } from "react";

interface ScrollContextType {
    registerRef: (key: string, ref: React.RefObject<HTMLDivElement>) => void;
    scrollToSection: (key: string) => void;
    animation: (key: string) => void;
}

const ScrollContext = createContext<ScrollContextType>({
    registerRef: () => {},
    scrollToSection: () => {},
    animation: () => {},
});

export const useScroll = () => useContext(ScrollContext);

export default function ScrollProvider({ children }: { children: ReactNode }) {
    const refs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});

    const registerRef = (key: string, ref: React.RefObject<HTMLDivElement>) => {
        refs.current[key] = ref;
    };

    const scrollToSection = (key: string,mode?:any) => {
        refs.current[key]?.current?.scrollIntoView({
            behavior: "smooth",
            block: mode ? 'center' : 'start',
        });
    };
    const animation = (key: string) => {
        const element = refs.current[key]?.current;
        if (element) {
            element.style.transition = "all 1s ease";
            element.style.transform = "scale(1.2)";
            element.style.boxShadow = "0 0 58px rgb(184, 242, 203)";
            setTimeout(() => {
                element.style.backgroundColor = "";
                element.style.boxShadow = "";
                element.style.transform = "scale(1)";
            },1500)
        }
    };

    return (
        <ScrollContext.Provider value={{ registerRef, scrollToSection,animation }}>
            {children}
        </ScrollContext.Provider>
    );
}
