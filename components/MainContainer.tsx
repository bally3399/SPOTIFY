'use client'

import React, {useMemo} from "react";
import {twMerge} from "tailwind-merge";
import {FaHeart, FaSpotify} from "react-icons/fa6";
import Box from "@/components/Box";
import {FaHome, FaSearch} from "react-icons/fa";
import {usePathname} from "next/navigation";
import SideBarItem from "@/components/SideBarItem";

interface MainContainerProps {
    children: React.ReactNode
}
const MainContainer : React.FC<MainContainerProps> = ({children}) => {
    const pathName = usePathname()
    const routes = useMemo(() => [
        {
            icon: FaHome,
            label: "Home",
            active:  pathName === "/",
            href: "/"
        },
        {
            icon: FaSearch,
            label: "Search",
            active:  pathName === "/search",
            href: "/search"
        },
        {
            icon: FaHeart,
            label: "Favourites",
            active:  pathName === "/favourites",
            href: "/favourites"
        },


    ], [])

    return (
        <div className={twMerge('flex h-full backdrop-blur-md bg-black/50', "")}>
            <div className="flex flex-col h-full backdrop-blur-sm space-y-4">
                <div className="w-full flex items-center gap-3 px-4 py-6">
                    <FaSpotify className="text-4xl"/>
                    <p className="hidden md:block text-xl font-semibold">Spotify</p>
                </div>
                <div className="hidden md:flex flex-col gap-y-2 w-[300px] h-full">
                    <Box>
                        <div className="flex flex-col gap-y-4 py-4 px-4">
                            {routes.map((item) => (
                                <SideBarItem key={item.label} {...item} />
                            ))}
                        </div>
                    </Box>
                </div>
            </div>

            <main>{children}</main>
            <div></div>
        </div>
    );
};

export default MainContainer;