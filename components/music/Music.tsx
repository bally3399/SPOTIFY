import {RecommendationsRoot, TracksItem} from "@/database.types";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Image from "next/image";

const Music = () =>{

    const fetchRecommended = async (): Promise<TracksItem[]> => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/recommendations',
            params: {
                limit: '100',
                seed_tracks: '6HpMdN52TfJAwVbmkrFeBN',
                seed_artists: '3tVQdUvClmAT7URs9V3rsp',
                seed_genres: 'hiphop'
            },
            headers: {
                'x-rapidapi-key': '41e5498422msha2c43afe3d68e7ep1a57e9jsn99ff47cc6194',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request<RecommendationsRoot>(options); // Specify Root as the response type
            return response.data.tracks;
        } catch (error) {
            console.error('Error fetching recommended tracks:', error);
            return [];
        }
    };

    const [recommended, setRecommended] = useState<TracksItem[]>([]);

    useEffect(() => {
        const loadRecommendedTracks = async () => {
            const tracks = await fetchRecommended();
            setRecommended(tracks);
        };
        loadRecommendedTracks();
    }, []);


    return (
        <div className="mt-24">
            <h1 className="text-xl font-bold mb-6">Recommended for Today</h1>
            {recommended.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommended.map((track, index) => (
                        <li key={index} className="bg-black p-4 rounded-lg shadow-md flex flex-col items-center">
                            <Image
                                src={track.album.images[0]?.url}
                                alt={track.name}
                                className="w-full rounded-lg mb-4"
                                width={300}
                                height={300}
                            />
                            <div className="text-center">
                                <p className="font-bold mb-2">{track.name}</p>
                                <p className="text-gray-500 text-sm mb-2">
                                    by {track.artists.map((artist) => artist.name).join(', ')}
                                </p>
                                <a
                                    href={track.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 text-sm"
                                >
                                    Listen on Spotify
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No recommendations available.</p>
            )}
        </div>

    )
}
export default Music