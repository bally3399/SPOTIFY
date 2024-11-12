'use client'

import React, {useMemo} from "react";
import {twMerge} from "tailwind-merge";
import {FaHeart, FaSpotify, FaUser} from "react-icons/fa6";
import {FaHome, FaSearch, FaUsers} from "react-icons/fa";
import {usePathname, useRouter} from "next/navigation";
import SideBarItem from "@/components/SideBarItem";
import RightBar from "@/components/RightBar";
import Link from "next/link";
import {BsMusicNoteList} from "react-icons/bs";
import {GiImperialCrown} from "react-icons/gi";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import Navbar from "@/components/Navbar";
import MusicLibrary from "@/components/Library";
import Footer from "@/components/Footer";


interface MainContainerProps {
    children: React.ReactNode
}
const MainContainer : React.FC<MainContainerProps> = ({children}) => {
    const pathName = usePathname();
    const router = useRouter();


    const supabaseClient = useSupabaseClient();
    const handleLogout = async () =>{
        const {error} = await supabaseClient.auth.signOut()
        router.refresh()
        if(error){
            console.log(error)
        }
    }
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
        <div className={twMerge('flex h-[100vh] backdrop-blur-md bg-black/50')}>
            <Navbar/>
            <div className="flex flex-col h-full backdrop-blur-sm space-y-4">
                <div className="w-full flex items-center gap-3 px-4 py-6">
                    <FaSpotify className="text-4xl"/>
                </div>
                <div className="hidden md:flex flex-col gap-y-2 w-[300px] h-full">
                    <div className={'md:hidden '}>
                        <div className="flex flex-col gap-y-4 py-4 px-4">
                            {routes.map((item) => (
                                <SideBarItem key={item.label} {...item} />
                            ))}
                        </div>
                    </div>
                    <MusicLibrary/>
                </div>
            </div>

            <main className='flex-1 overflow-y-auto py-6  '>{children}</main>
            {/*<div className='flex justify-between'>*/}
            {/*    <Link className='bg-white text-black rounded-3xl' href={'/'}>*/}
            {/*        All*/}
            {/*    </Link>*/}
            {/*    <Link className='rounded-3xl py-3 px-3' href={'/'}>*/}
            {/*        Music*/}
            {/*    </Link>*/}

            {/*    <Link className='rounded-3xl py-3 px-3' href={'/'}>*/}
            {/*        Podcasts*/}
            {/*    </Link>*/}
            {/*</div>*/}
            <Footer/>

            <RightBar>
                <Link href={'/artist'} className='bg-transparent-zinc-200 py-2'>
                    <FaUsers size={20} className='text-neutral-400 text-2xl'/>
                </Link>

                <Link href={'/songs'} className='bg-transparent-zinc-200 py-2'>
                    <BsMusicNoteList size={20} className='text-neutral-400 text-2xl'/>
                </Link>

                <div className='flex flex-col items-center justify-center gap-y-2 mt-auto relative'>
                    <GiImperialCrown size={24} className='text-white'/>
                    <p className='whitespace-nowrap text-neutral-400 font-normal text-lg'>Go <span>Pro</span></p>
                </div>

            </RightBar>
        </div>
    )
}

export default MainContainer;