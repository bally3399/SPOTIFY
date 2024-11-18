import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaArrowRight, FaFolder } from "react-icons/fa";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import Image from 'next/image'
import styles from "@/components/styles.module.css";
import {getTracks} from "@/API/searchTrack";
import {ArtistRootObject} from "@/database.types";


const MusicLibrary: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchResults, setSearchResults] = useState<ArtistRootObject[]>([]); // Explicitly typed as TransformedTrack[]

    const fetchTracks = async (): Promise<ArtistRootObject[]> => {
        if (!searchInput.trim()) return [];

        const response: ArtistRootObject = await getTracks(searchInput.trim()) ?? {} as ArtistRootObject;

        if (!response.albums?.items || response.albums.items.length === 0) return [];

        const artistRootObjects: ArtistRootObject[] = response.albums.items.map((item) => ({
            albums: {
                totalCount: response.albums.items.length,
                items: [
                    {
                        data: {
                            uri: item.data.uri,
                            name: item.data.name,
                            artists: {
                                items: item.data.artists.items.map((artist) => ({
                                    uri: artist.uri,
                                    profile: {
                                        name: artist.profile.name,
                                    },
                                })),
                            },
                            coverArt: {
                                sources: item.data.coverArt.sources.map((source) => ({
                                    url: source.url,
                                    width: source.width,
                                    height: source.height,
                                })),
                            },
                            date: {
                                year: item.data.date.year,
                            },
                        },
                    },
                ],
            },
        }));

        return artistRootObjects;
    };


    useEffect(() => {
        const fetchAndSetTracks = async () => {
            const tracks = await fetchTracks();
            setSearchResults(tracks);
        };

        const debounced = setTimeout(() => {
            fetchAndSetTracks();
        }, 2000);

        return () => clearTimeout(debounced);
    }, [searchInput]);

    return (
        <div className="flex flex-col w-full md:w-[40%] lg:w-[20%] bg-[#121212] overflow-hidden text-white p-2 md:p-4">
            <div className="flex flex-col mb-4">
                <div className="flex items-center justify-between">
                    <FaBars size={20} onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer"/>
                    {isExpanded && (
                        <>
                            <h1 className="text-xl font-medium">Your Library</h1>
                            <AddIcon onClick={() => setShowDropdown(!showDropdown)} className="cursor-pointer"/>
                            <FaArrowRight size={20}/>
                        </>
                    )}
                </div>

                {showDropdown && (
                    <div className="mt-2 bg-neutral-700 shadow-md rounded-md p-2 w-64">
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-600 p-2 rounded-md">
                            <CreateIcon/>
                            <span>Create a new Playlist</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-600 p-2 rounded-md">
                            <FaFolder/>
                            <span>Create a Playlist Folder</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="bg-gray-800 p-2 rounded-md flex-grow">
                {!showSearch ? (
                    <FaSearch size={24} onClick={() => setShowSearch(true)}/>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="SearchTrack..."
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value)
                            }}
                            onBlur={() => {
                                if (!searchInput.trim()) setShowSearch(false);
                            }}
                        />
                    </>
                )}
                <div className={styles.grid}>
                    {searchResults.map((result, index) =>
                        result.albums.items.map((album) => (
                            <div key={`${album.data.uri}-${index}`} className={styles.inner}>
                                <Image
                                    className={styles.trackImages}
                                    src={
                                        album.data.coverArt.sources[0]?.url ||
                                        "/placeholder-image.png"
                                    }
                                    alt={album.data.name}
                                    width={100}
                                    height={100}
                                />
                                <p>{album.data.name}</p>
                                <p>By {album.data.artists.items.map((artist) => artist.profile.name).join(", ")}</p> {/* Artist Names */}
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default MusicLibrary;
