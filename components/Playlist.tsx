import React from 'react';
import Link from "next/link";

const Playlist = () => {
    // const [recentTracks, setRecentTracks] = useState([]);
    // // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchRecentlyPlayed = async () => {
    //         const url = 'https://api.spotify.com/v1/me/player/recently-played?before=2';
    //         const token = '62e4d1f79cmsh9e101e9a7fcb02ap10f3f2jsnce935fe4c389';

    //         try {
    //             const response = await axios.get(url, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });

    //             setRecentTracks(response.data.items);
    //         } catch (err) {

    //             // setError(err.response?.data || err.message);
    //         }
    //     };

    //     fetchRecentlyPlayed();
    // }, []);

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

            <div className="mt-16">
                <h1 className="text-xl font-bold mb-4">Recently Played</h1>
                {/* {error && <p className="text-red-500">Error: {error}</p>} */}
                {/*<ul>*/}
                {/*    {recentTracks.length > 0 ? (*/}
                {/*        recentTracks.map((track, index) => (*/}
                {/*            // <li key={index} className="mb-4">*/}
                {/*            //     <p className="text-white">*/}
                {/*            //         <strong>Track:</strong> {track|| 'Unknown'}*/}
                {/*            //     </p>*/}
                {/*            //     <p className="text-gray-400">*/}
                {/*            //         <strong>Artist:</strong> {track.map(artist => artist.name).join(', ') || 'Unknown'}*/}
                {/*            //     </p>*/}
                {/*            // </li>*/}
                {/*        ))*/}
                    {/* ) : (
                        <p className="text-gray-400">No recently played tracks available.</p> */}
                    {/*)}*/}
                {/*</ul>*/}
            </div>
         </div>
    );
};

export default Playlist;
