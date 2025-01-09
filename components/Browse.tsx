import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BrowseStartData } from '@/database.types';

const Browse: React.FC = () => {
    const [browseData, setBrowseData] = useState<BrowseStartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://spotify23.p.rapidapi.com/browse_all';
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
                const data: BrowseStartData = await response.json();
                console.log('API Response:', data);
                setBrowseData(data);
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!browseData || !browseData.data.browseStart.sections) return null;

    return (
        <div className="p-4">
            {browseData.data.browseStart.sections.items.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                    {section.data.title?.transformedLabel && (
                        <h2 className="text-xl font-semibold mb-4">
                            {section.data.title.transformedLabel}
                        </h2>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {section.sectionItems.items.map((item, itemIndex) => {
                            const id =
                                item.content?.data?.data?.cardRepresentation?.title?.transformedLabel || 'no-title';
                            return (
                                <Link key={itemIndex} href={'/album'} passHref>
                                    <div
                                        className="cursor-pointer p-4 relative text-white rounded-lg shadow transform transition-all overflow-hidden"
                                        style={{
                                            backgroundColor:
                                                item.content?.data?.data?.cardRepresentation?.backgroundColor?.hex ||
                                                'transparent',
                                        }}
                                    >
                                        <Image
                                            src={
                                                item?.content?.data?.data?.cardRepresentation?.artwork?.sources?.[0]?.url ||
                                                'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb'
                                            }
                                            alt={id}
                                            width={100}
                                            height={100}
                                            className="w-[120px] rounded-md overflow-hidden transform translate-x-[120px] translate-y-[60px] rotate-[20deg]"
                                        />
                                        <h2 className="text-lg font-semibold mt-2 p-2 rounded items-center top-[20]">
                                            {id}
                                        </h2>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Browse;
