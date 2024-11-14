'use client';

import React from 'react';
import MainContainer from '@/components/MainContainer';

interface HomeProps {
    children: React.ReactNode; 
}

interface PageProps extends HomeProps {}

export default function Home({ children }: HomeProps) {
    return (
        <div>
            <MainContainer>{children}</MainContainer>
        </div>
    );
}
