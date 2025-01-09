import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaArrowRight, FaFolder } from "react-icons/fa";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import Image from 'next/image'
import styles from "@/components/styles.module.css";
import {getTracks} from "@/API/searchTrack";
import {ArtistRootObject} from "@/database.types";
import Link from "next/link";
// import axios from "axios";




const MusicLibrary: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchResults, setSearchResults] = useState<ArtistRootObject[]>([]);
    // const [artists, setArtist] = useState<Artist[]>([]);


    // useEffect(() => {
    //     const options = {
    //         method: 'GET',
    //         url: 'https://api.spotify.com/v1/artists',
    //         params: {
    //             ids: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
    //         },
    //         headers: {
    //             'Authorization': 'Bearer 1POdFZRZbvb...qqillRxMr2z',
    //         },
    //     };
    //
    //     const fetchArtistsData = async () => {
    //         try {
    //             const response = await axios.request<ArtistRoot>(options);
    //             setArtist(response.data.artists);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //
    //     fetchArtistsData();
    // }, []);

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
        <div className="flex flex-col overflow-auto h-[100vh] w-full md:w-[40%] lg:w-[20%] bg-[#121212] text-white p-2 md:p-4">
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
                            <Link href={'/'}>Create a new Playlist</Link>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-600 p-2 rounded-md">
                            <FaFolder/>
                            <Link href={'/'}>Create a Playlist Folder</Link>
                        </div>
                    </div>
                )}
            </div>
            <div className="bg-gray-800 p-4 rounded-md flex-grow">
                {!showSearch ? (
                    <FaSearch size={24} onClick={() => setShowSearch(true)}/>
                ) : (
                    <>
                        <input className='p-4'
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
                                <p>By {album.data.artists.items.map((artist) => artist.profile.name).join(", ")}</p>                            </div>
                        ))
                    )}
                </div>
                {/*<div>*/}
                {/*    <h1>Create Your First Playlist</h1>*/}
                {/*    <p>It is, we will help you</p>*/}
                {/*    <button>Create Playlist</button>*/}
                {/*</div>*/}
            </div>
            {/*<div>*/}
            {/*    <h1>Artists</h1>*/}
            {/*        {artists.length > 0 ? (*/}
            {/*            <div>*/}
            {/*                {artists.map((artist) => (*/}
            {/*                    <div key={artist.id}>*/}
            {/*                        <h2>{artist.name}</h2>*/}
            {/*                        <p>Followers: {artist.followers.total}</p>*/}
            {/*                        <p>Popularity: {artist.popularity}</p>*/}
            {/*                        <p>Genres: {artist.genres.join(', ')}</p>*/}
            {/*                        <img src={artist.images[0]?.url} alt={artist.name} width="200" />*/}
            {/*                        <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">*/}
            {/*                            View on Spotify*/}
            {/*                        </a>*/}
            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*        ) : (*/}
            {/*            <p>Loading artists...</p>*/}
            {/*        )}*/}
            {/*    </div>*/}

        </div>
    )
};

export default MusicLibrary;

