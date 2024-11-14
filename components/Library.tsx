import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaArrowRight, FaFolder } from "react-icons/fa";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import {Artist} from '../components/ArtistInterface';
import Image from 'next/image'


const MusicLibrary: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [artists, setArtists] = useState<Artist>({id: '',name: '',genre: '', bio: '', albums: [],imageUrl: '',birthDate: '',nationality:''});
    const [isLoading, setIsLoading] = useState(false);
    const [allArtists, setAllArtists] = useState<Artist[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const fetchAllArtists = async () => {
        setIsLoading(true);
        const options = {
            method: "GET",
            url: "https://spotify23.p.rapidapi.com/search/",
            params: {
                q: "artist",
                type: "artist",
                offset: "0",
                limit: "50",
            },
            headers: {
                "x-rapidapi-key": "41e5498422msha2c43afe3d68e7ep1a57e9jsn99ff47cc6194",
                "x-rapidapi-host": "spotify23.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            const fetchedArtists = response.data.artists.items.map((item :{
                id: string;
                name: string;
                images: { url: string }[]}
             ) => ({
                id: item.id,
                name: item.name,
                images: item.images,
            }));
            setAllArtists(fetchedArtists);
            setArtists(fetchedArtists); 
        } catch (error) {
            console.error("Error fetching artists:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchArtistById = async (id: string) => {
        setIsLoading(true);
        const options = {
            method: "GET",
            url: `https://spotify23.p.rapidapi.com/artists/`,
            params: { ids: id },
            headers: {
                "x-rapidapi-key": "41e5498422msha2c43afe3d68e7ep1a57e9jsn99ff47cc6194",
                "x-rapidapi-host": "spotify23.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            console.log("Artist details:", response.data);
        } catch (error) {
            console.error("Error fetching artist details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterArtists = (artist:string, allArtist: Artist[]) => {
        return allArtist.filter((artists:Artist) => {
            const artistName = artists.name;
            return artistName.toLowerCase().includes(artist.toLowerCase());
        });
    };


    useEffect(() => {
        if (searchQuery.trim()) {
            filterArtists(searchQuery,allArtists);
        } else {
            setAllArtists(allArtists);
        }
    }, [searchQuery, allArtists]);

    useEffect(() => {
        fetchAllArtists();
    }, []);

    return (
        <div className="flex flex-col w-[20%] bg-[#121212] text-white p-4">
            <div className="flex flex-col mb-4">
                <div className="flex items-center justify-between">
                    <FaBars size={20} onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer" />
                    {isExpanded && (
                        <>
                            <h1 className="text-xl font-medium">Your Library</h1>
                            <AddIcon onClick={() => setShowDropdown(!showDropdown)} className="cursor-pointer" />
                            <FaArrowRight size={20} />
                        </>
                    )}
                </div>

                {showDropdown && (
                    <div className="mt-2 bg-neutral-700 shadow-md rounded-md p-2 w-64">
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-600 p-2 rounded-md">
                            <CreateIcon />
                            <span>Create a new Playlist</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-600 p-2 rounded-md">
                            <FaFolder />
                            <span>Create a Playlist Folder</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center mb-4">
                {!showSearch ? (
                    <FaSearch size={24} onClick={() => setShowSearch(true)} />
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-gray-800 p-2 rounded-md flex-grow"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => {
                                if (!searchQuery.trim()) setShowSearch(false);
                            }}
                        />
                    </>
                )}
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto">
                {isLoading && <p>Loading...</p>}
                {!isLoading && allArtists.length === 0 && searchQuery && <p>No artists found</p>}
                {artists && allArtists.map((artist: Artist) => (
                    <div
                        key={artist.id}
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => fetchArtistById(artist.id)}
                    >
                        <Image
                            src={artist.imageUrl?.[0]|| "/default-image.jpg"}
                            alt={artist.name || "Artist"}
                            className="w-12 h-12 rounded-full"
                        />

                        <div>
                            <h2 className="font-bold">{artist.name}</h2>
                            <p className="text-sm text-gray-400">Artist</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicLibrary;
