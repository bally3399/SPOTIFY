import React, { useState } from 'react';
import {HiMenu} from 'react-icons/hi';
import Link from 'next/link';
import {FaHome, FaSearch} from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';
import { FaSpotify } from 'react-icons/fa6';
import {TextField, InputAdornment} from '@mui/material';
import { styled } from '@mui/system';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

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

const BrowseNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="relative flex justify-between items-center shadow-md bg-black p-4">
            <div className="flex items-center text-white">
                <FaSpotify className="text-4xl" />
            </div>

            <div className="hidden pr-64 md:flex items-center text-white">
                <div className='flex bg-[#393939] justify-center items-center h-full rounded-2xl p-[10px] '>
                    <FaHome className='text-white'/>
                </div>
                <SearchField
                    variant="outlined"
                    placeholder="What do you want to play?"
                    size="small"
                    sx={{ width: '350px', color: '#ffffff' }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaSearch style={{ color: 'white', fontSize: '18px' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <Link href={'/browse'}>
                                    <InputAdornment position="end">
                                        <OpenInBrowserIcon style={{ color: 'white', fontSize: '20px' }} />
                                    </InputAdornment>
                                </Link>
                            ),
                        },

                    }}
                />

                <Link href="/install">
                    <button className="pr-10 text-white px-4 py-2 rounded-3xl">
                        <ArrowCircleDownIcon/>
                        Install App
                    </button>
                </Link>
                <IoNotifications/>
                <Link href="/login" className='pl-10 gap-3'>Login</Link>
                <Link href="/signup" className='pl-10'>Signup</Link>
            </div>

            <HiMenu
                className="text-2xl md:hidden text-white cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
            />

            {menuOpen && (
                <ul className="absolute z-10 top-full left-0 w-full bg-white shadow-md text-lg">
                    <li className="hover:text-blue-300 cursor-pointer p-4 text-black">
                        <Link href="/explore">Explore Premium</Link>
                    </li>
                    <li className="hover:text-gray-600 cursor-pointer p-4 text-black">
                        <Link href="/install">Install App</Link>
                    </li>
                    <li className="hover:text-gray-600 cursor-pointer p-4 text-black">
                        <Link href="/login">Login</Link>
                    </li>
                    <li className="hover:text-gray-600 cursor-pointer p-4 text-black">
                        <Link href="/signup">Signup</Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default BrowseNavbar;
