'use client'

import React from "react";
import MusicPlayer from "@/components/MusicPlayer";

interface MusicProps {
    children: React.ReactNode;
}

export default function music({ children }: MusicProps) {
    return (
        <div>
            <MusicPlayer>{children}</MusicPlayer>
        </div>
    );
}