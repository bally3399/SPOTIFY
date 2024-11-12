import React, {useState} from 'react';
import {HiMenu} from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import myLogo from "../public/assets/Spotify_icon.png"
import {FaHome} from "react-icons/fa";
import {TextField} from "@mui/material";
import {styled} from "@mui/system";
import {IoNotifications} from "react-icons/io5";
import {FaSpotify} from "react-icons/fa6";


const SearchField = styled(TextField)({
    backgroundColor: '#1f1f1f',
    borderRadius: '50px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#212121',
            borderRadius: '50px',
        },
        '&:hover fieldset': {
            borderColor: '#212121',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#212121',
        },
        '& input': {
            color: 'white',
        },
    },
});

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div
            className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 shadow-md bg-black'>
            <div className='flex items-center mb-4 space-x-16 text-white'>
                <FaSpotify className="text-4xl"/>
            </div>
            <section className={'flex gap-[20px] justify-between items-center'}>
                <div className='hidden md:flex text-lg'>
                    <div className='flex justify-center items-center h-full rounded-2xl p-[10px] '>
                        <FaHome className='text-white'/>
                    </div>
                    <div>
                        <SearchField
                            variant="outlined"
                            placeholder="What did you want to play"
                            size="small"
                            sx={{
                                width: '350px',
                                textColor:'#ffffff',
                                color: "#ffffff"
                            }}
                        />
                    </div>

                </div>
                <div className='flex items-center justify-center'>
                    <Link href={'/explore'}>
                        <button
                            className='bg-white text-black px-4 py-2 rounded-3xl hover:bg-neutral-300'
                        >
                            Explore premium
                        </button>
                    </Link>
                    <Link href={'/install'}>
                        <button
                            className='text-white px-4 py-2 rounded-3xl'
                        >

                            Install App
                        </button>
                        <HiMenu className="text-2xl md:hidden cursor-pointer hover:text-gray-600"
                                onClick={() => setMenuOpen(!menuOpen)}/>
                    </Link>
                </div>
                <div className='flex justify-center items-center h-full rounded-2xl p-[8px] '>
                    <IoNotifications className='text-white'/>
                </div>
                <div className='flex gap-[20px] justify-center items-center h-full rounded-2xl p-[10px] '>
                    <Link href={'/login'}>
                        Login
                    </Link>
                </div>

                <div className='flex gap-[20px] justify-center items-center h-full rounded-2xl p-[10px] '>
                    <Link href={'/signup'}>
                        Signup
                    </Link>
                </div>

            </section>

            {/*{menuOpen && (*/}
            {/*    <ul className='md:hidden absolute z-10 top-16 left-0 w-full bg-white shadow-md text-lg'>*/}
            {/*        <div className='hover:text-blue-300 cursor-pointer p-4 text-black'></div>*/}
            {/*        <div className='hover:text-gray-600 cursor-pointer p-4 text-black'>Features</div>*/}
            {/*        <div className='hover:text-gray-600 cursor-pointer p-4 text-black'>Blog</div>*/}
            {/*        <div className='hover:text-gray-600 cursor-pointer p-4 text-black'>About us</div>*/}
            {/*        <div className='hover:text-gray-600 cursor-pointer p-4 text-black'>Contact us</div>*/}
            {/*    </ul>*/}
            {/*)}*/}
        </div>
    );
};

export default Navbar;