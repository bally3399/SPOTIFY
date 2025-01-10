import React from 'react';
import Link from 'next/link';
import Music from "@/components/music/Music";

const Playlist = () => {
    return (
        <div className="flex-col">
            <div className="flex mt-10 fixed gap-2">
                <Link className="bg-white py-3 px-3 text-sm text-black rounded-3xl" href="/">
                    All
                </Link>
                <Link className="rounded-3xl py-3 px-3 text-sm bg-[#393939]" href={"/music"}>
                    Music
                </Link>
                <Link className="rounded-3xl py-3 px-3 text-sm bg-[#393939]" href="/">
                    Podcasts
                </Link>
            </div>
            <Music/>
        </div>
    );
};

export default Playlist;



