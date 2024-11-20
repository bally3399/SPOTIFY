import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from "next/image";
import {TracksItem, RecommendationsRoot} from "@/database.types";


const fetchRecommended = async (): Promise<TracksItem[]> => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/recommendations',
        params: {
            limit: '20',
            seed_tracks: '0c6xIDDpzE81m2q797ordA',
            seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
            seed_genres: 'classical,country'
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
const Playlist = () => {
    // const [recentTracks, setRecentTracks] = useState<Track[]>([]);
    // const [toGetStarted, setToGetStarted] = useState<Artist | null>(null);
    //
    // const fetchRecentlyPlayed = async () => {
    //     const token = process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN;
    //     const url = 'https://api.spotify.com/v1/me/player/recently-played';
    //
    //     try {
    //         const response = await axios.get(url, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });
    //         setRecentTracks(response.data.items.map((item: any) => item.track) || []);
    //     } catch (err) {
    //         console.error('Error fetching recently played tracks:', err);
    //     }
    // };
    //
    // const fetchToGetStarted = async () => {
    //     const options = {
    //         method: 'GET',
    //         url: 'https://spotify23.p.rapidapi.com/artists/',
    //         params: { ids: '2w9zwq3AktTeYYMuhMjju8' },
    //         headers: {
    //             'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    //             'x-rapidapi-host': 'spotify23.p.rapidapi.com',
    //         },
    //     };
    //
    //     try {
    //         const response = await axios.request(options);
    //     } catch (error) {
    //         console.error('Error fetching "To Get You Started":', error);
    //     }
    // };

    const [recommended, setRecommended] = useState<TracksItem[]>([]);

    useEffect(() => {
        const loadRecommendedTracks = async () => {
            const tracks = await fetchRecommended();
            setRecommended(tracks);
        };
        loadRecommendedTracks();
    }, []);


    return (
        <div className="flex-col">
            <div className="flex mt-10 fixed gap-2">
                <Link className="bg-white py-3 px-3 text-sm text-black rounded-3xl" href="/">
                    All
                </Link>
                <Link className="rounded-3xl py-3 px-3 text-sm bg-[#393939]" href="/">
                    Music
                </Link>
                <Link className="rounded-3xl py-3 px-3 text-sm bg-[#393939]" href="/">
                    Podcasts
                </Link>
            </div>

            {/*<div className="mt-24">*/}
            {/*    <h1 className="text-xl font-bold mb-4">Recently Played</h1>*/}
            {/*    <ul>*/}
            {/*        {recentTracks.length > 0 ? (*/}
            {/*            recentTracks.map((track, index) => (*/}
            {/*                <li key={index} className="mb-2">*/}
            {/*                    {track.name} by {track.artists.map(artist => artist.name).join(', ')}*/}
            {/*                </li>*/}
            {/*            ))*/}
            {/*        ) : (*/}
            {/*            <p>No recently played tracks available.</p>*/}
            {/*        )}*/}
            {/*    </ul>*/}
            {/*</div>*/}

            {/*<div className="mt-24">*/}
            {/*    <h1>To Get You Started</h1>*/}
            {/*    {toGetStarted ? (*/}
            {/*        <div>*/}
            {/*            <h2>{toGetStarted.name}</h2>*/}
            {/*            <p>Followers: {toGetStarted.followers}</p>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <p>Loading artist details...</p>*/}
            {/*    )}*/}
            {/*</div>*/}

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

        </div>
    );
};

export default Playlist;



