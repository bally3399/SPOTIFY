'use client'

import React from "react";
import {twMerge} from "tailwind-merge";
import Playlist from "@/components/Playlist";
import Navbar from "@/components/Navbar";
import MusicLibrary from "@/components/Library";
import Footer from "@/components/Footer";

interface MainContainerProps {
    children: React.ReactNode
}
const MainContainer : React.FC<MainContainerProps> = ({children}) => {

    return (
        <div className={twMerge('flex h-[100vh]  flex-col backdrop-blur-md bg-black/50')}>
            <Navbar/>
            <div className={'flex bg-[#0a0f17]'}>
                <MusicLibrary/>
                <div className={`overflow-auto h-[100vh] flex flex-col w-[80%]`}>
                    <Playlist/>
                    <Footer/>
                </div>
            </div>
            <div>{children}</div>
        </div>

    )
}

export default MainContainer;