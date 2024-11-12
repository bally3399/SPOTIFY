import React, { useState } from "react";
import { FaSearch, FaBars, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';


const MusicLibrary: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const fetchArtists = async () => {
        if (!searchQuery.trim()) return;
        setIsLoading(true);

        const options = {
            method: "GET",
            url: "https://shazam-api6.p.rapidapi.com/shazam/search_artist/",
            params: { limit: "10", query: searchQuery },
            headers: {
                "x-rapidapi-key": "62e4d1f79cmsh9e101e9a7fcb02ap10f3f2jsnce935fe4c389",
                "x-rapidapi-host": "shazam-api6.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            setArtists(response.data.artists || []);
        } catch (error) {
            console.error("Error fetching artists:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleArtistClick = async (artistId: string) => {
        const options = {
            method: "GET",
            url: "https://shazam-core.p.rapidapi.com/v2/artists/details",
            params: { artist_id: artistId },
            headers: {
                "x-rapidapi-key": "62e4d1f79cmsh9e101e9a7fcb02ap10f3f2jsnce935fe4c389",
                "x-rapidapi-host": "shazam-core.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            console.log("Artist Details:", response.data);
        } catch (error) {
            console.error("Error fetching artist details:", error);
        }
    };

    return (
        <div className="flex flex-col w-full h-full bg-black text-white p-4">
            <div className="flex items-center justify-between mb-4">
                <FaBars size={20} />
                <h1 className="text-xl font-medium">Your Library</h1>
                <AddIcon/>
                <FaArrowRight size={20} />
            </div>

            <div className="flex items-center mb-4">
                {!showSearch ? (
                    <FaSearch size={24} onClick={() => setShowSearch(true)} />
                ) : (
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
                )}
                {/*<button*/}
                {/*//     className="ml-2 bg-green-500 px-2 py-2 rounded-md"*/}
                {/*//     onClick={fetchArtists}*/}
                {/*//     disabled={isLoading}*/}
                {/*// >*/}
                {/*    {isLoading ? "Loading..." : "Search"}*/}
                {/*</button>*/}
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto">
                {artists.length === 0 && <p>No artists found</p>}
                {artists.map((artist: any) => (
                    <div
                        key={artist.id}
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => handleArtistClick(artist.id)}
                    >
                        <img
                            src={artist.image || "/default-artist.png"}
                            alt={artist.name}
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <h2 className="font-bold">{artist.name}</h2>
                            <p className="text-sm text-gray-400">{artist.role || "Artist"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicLibrary;
