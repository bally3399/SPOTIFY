import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Track } from '@/database.types';

interface AlbumPageProps {
    id: string;
}

const AlbumPage: React.FC<AlbumPageProps> = ({ id }) => {
    const [track, setTrack] = useState<Track | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrackDetails = async () => {
            const url = `https://spotify23.p.rapidapi.com/track/?id=${id}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '41e5498422msha2c43afe3d68e7ep1a57e9jsn99ff47cc6194',
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
                },
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data: Track = await response.json();
                setTrack(data);
            } catch (err: any) {
                console.error('Error fetching track details:', err);
                setError(err.message);
            }
        };

        fetchTrackDetails();
    }, [id]);

    if (error) return <div>Error: {error}</div>;
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
                src={track.album.images?.[0]?.url || '/placeholder.png'}
                alt={track.name}
                className="mt-4 rounded-lg shadow-lg"
            />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    return { props: { id } };
};

export default AlbumPage;
