'use client'

import React, {useMemo} from "react";
import {twMerge} from "tailwind-merge";
import {FaHeart, FaSpotify, FaUser} from "react-icons/fa6";
import Box from "@/components/Box";
import {FaHome, FaSearch, FaUsers} from "react-icons/fa";
import {usePathname, useRouter} from "next/navigation";
import SideBarItem from "@/components/SideBarItem";
import RightBar from "@/components/RightBar";
import Button from "@/components/Button";
import Link from "next/link";
import {BsMusicNoteList} from "react-icons/bs";
import {GiImperialCrown} from "react-icons/gi";
import useAuthModal from "@/hooks/useAuthModal";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useUser} from "@/hooks/useUser";
import Image from 'next/image';
import {CiLogout} from "react-icons/ci";

interface MainContainerProps {
    children: React.ReactNode
}
const MainContainer : React.FC<MainContainerProps> = ({children}) => {
    const pathName = usePathname();
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const {user} = useUser();
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
        <div className={twMerge('flex h-full backdrop-blur-md bg-black/50')}>
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

            <main className='flex-1 overflow-y-auto py-6  '>{children}</main>
            <RightBar>
                {user?.user_metadata?.url ? (
                    <Image
                        className='w-full absolute h-full object-cover rounded-full'
                        src={user.user_metadata.url}
                        alt='User Avatar'
                    />
                ) : (
                    <Button onClick={authModal.onOpen}>
                        <FaUser size={20} className='text-black' />
                    </Button>
                )}




                <Link href={'/artist'} className='bg-transparent-zinc-200 py-2'>
                    <FaUsers size={20} className='text-neutral-400 text-2xl'/>
                </Link>

                <Link href={'/songs'} className='bg-transparent-zinc-200 py-2'>
                    <BsMusicNoteList size={20} className='text-neutral-400 text-2xl'/>
                </Link>

                <div className='flex flex-col items-center justify-center gap-y-2 mt-auto relative'>
                    <GiImperialCrown size={24} className='text-white' />
                    <p className='whitespace-nowrap text-neutral-400 font-normal text-lg'>Go <span>Pro</span></p>
                </div>

                {user && [
                    <Button className='bg-transparent' onClick={handleLogout}>
                        <CiLogout size={25} className='text-neutral-400 '/>
                    </Button>
                ]}
            </RightBar>
        </div>
    );
};

export default MainContainer;