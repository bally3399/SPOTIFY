'use client'

import React from "react";
import {twMerge} from "tailwind-merge";
import MusicLibrary from "@/components/Library";
import Footer from "@/components/Footer";
import Browse from '@/components/Browse';
import BrowseNavbar from "@/components/BrowseNavbar";

const SearchAndBrowse = () => {
    return (
        <div className={twMerge('flex h-[100vh]  flex-col backdrop-blur-md bg-black/50')}>
            <BrowseNavbar/>
            <div className={'flex bg-[#0a0f17]'}>
                <MusicLibrary/>
                <div className={`overflow-auto h-[100vh] flex flex-col w-[80%]`}>
                    <Browse/>
                    <Footer/>
                </div>
            </div>

        </div>
    );
};

export default SearchAndBrowse;