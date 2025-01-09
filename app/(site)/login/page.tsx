'use client'
import MusicPlayer from "@/components/MusicPlayer";
import React from "react";
import { TracksItem } from "@/database.types";

interface LoginProps {
    tracks: TracksItem[];
}

export default function login({ tracks }: LoginProps) {
    return (
        <div>
            {/*<Login/>*/}
            <MusicPlayer tracks={tracks}></MusicPlayer>
        </div>
    );
}