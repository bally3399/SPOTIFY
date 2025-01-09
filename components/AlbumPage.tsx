import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Track } from '@/database.types';
const AlbumPage: React.FC = () => {
    const [track, setTrack] = useState<Track | null>(null);

    useEffect(() => {
        const fetchTrackDetails = async () => {
            const url = `https://spotify23.p.rapidapi.com/track/?id=`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'YOUR_API_KEY',
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
                },
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data: Track = await response.json(); // Mapping the API response to Track
                setTrack(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTrackDetails();
    }, []);

    if (!track) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{track.name}</h1>
            <p className="text-lg">Artist: {track.artists.map((artist) => artist.name).join(', ')}</p>
            <p className="text-lg">Album: {track.album.name}</p>
            <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
            >
                Listen on Spotify
            </a>
            <img
                src={track.album.images[0].url}
                alt={track.name}
                className="mt-4 rounded-lg shadow-lg"
            />
        </div>
    );
};

export default AlbumPage;
