'use client'
import React, {ReactNode} from 'react';
import MainContainer from "@/components/MainContainer";

export default function Home(data:{component:ReactNode}) {
    return (
        <div>
            <MainContainer children={data.component}/>
        </div>
    );
}