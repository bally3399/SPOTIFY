import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {Track, Artist} from "@/components/ArtistInterface";


const Playlist = () => {
    const getCurrentTrack = (currentTrackURL: string) =>{

    }
    const [recentTracks, setRecentTracks] = useState<Track[]>([]);
    const [toGetStarted, setToGetStarted] = useState<Artist | null>(null);
    const [recommended, setRecommended] = useState<Track[]>([]);

    const fetchRecentlyPlayed = async () => {
        const token = process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN;
        const url = 'https://api.spotify.com/v1/me/player/recently-played';

        try {
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecentTracks(response.data.items.map((item: any) => item.track) || []);
        } catch (err) {
            console.error('Error fetching recently played tracks:', err);
        }
    };

    const fetchToGetStarted = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/artists/',
            params: { ids: '2w9zwq3AktTeYYMuhMjju8' },
            headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
                'x-rapidapi-host': 'spotify23.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            setToGetStarted(response.data.artists[0] || null);
        } catch (error) {
            console.error('Error fetching "To Get You Started":', error);
        }
    };

    const fetchRecommended = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/recommendations/',
            params: {
                limit: '20',
                seed_tracks: '0c6xIDDpzE81m2q797ordA',
                seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
                seed_genres: 'classical,country',
            },
            headers: {
                'x-rapidapi-key': '62e4d1f79cmsh9e101e9a7fcb02ap10f3f2jsnce935fe4c389',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            setRecommended(response.data.tracks || []);
        } catch (error) {
            console.error('Error fetching recommended tracks:', error);
        }
    };

    useEffect(() => {
        fetchRecentlyPlayed();
        fetchToGetStarted();
        fetchRecommended();
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

            <div className="mt-24">
                <h1 className="text-xl font-bold mb-4">Recently Played</h1>
                <ul>
                    {recentTracks.length > 0 ? (
                        recentTracks.map((track, index) => (
                            <li key={index} className="mb-2">
                                {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                            </li>
                        ))
                    ) : (
                        <p>No recently played tracks available.</p>
                    )}
                </ul>
            </div>

            <div className="mt-24">
                <h1>To Get You Started</h1>
                {toGetStarted ? (
                    <div>
                        <h2>{toGetStarted.name}</h2>
                        <p>Followers: {toGetStarted.followers}</p>
                    </div>
                ) : (
                    <p>Loading artist details...</p>
                )}
            </div>

            <div className="mt-24">
                <h1>Recommended for Today</h1>
                <ul>
                    {recommended.length > 0 ? (
                        recommended.map((track, index) => (
                            <li key={index} className="mb-2">
                                {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                            </li>
                        ))
                    ) : (
                        <p>No recommendations available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Playlist;
