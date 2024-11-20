'use client'
// @ts-ignore
import Stripe from 'stripes';

export interface SpotifyResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SpotifyItem[];
}

export interface SpotifyItem {
    album: Album;
    // artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIDs;
    external_urls: ExternalURLs;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from?: Record<string, unknown>;
    restrictions?: Restrictions;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}
export interface TransformedTrack {
    id: string;
    title: string;
    song_url: string;
    image_url: string;
    user_id: string;
    artist_id: string;
}


export interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalURLs;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: Restrictions;
    type: string;
    uri: string;
    // artists: Artist[];
}

export interface Artist {
    external_urls: ExternalURLs;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface ExternalURLs {
    spotify: string;
}

export interface ExternalIDs {
    isrc?: string;
    ean?: string;
    upc?: string;
}

export interface Image {
    url: string;
    height: number;
    width: number;
}

export interface Restrictions {
    reason: string;
}



export interface RootObjectAlbumsItemsDataArtistsItemsProfile {
    name: string;
}

export interface RootObjectAlbumsItemsDataArtistsItems {
    uri: string;
    profile: RootObjectAlbumsItemsDataArtistsItemsProfile;
}

export interface RootObjectAlbumsItemsDataArtists {
    items: RootObjectAlbumsItemsDataArtistsItems[];
}

export interface RootObjectAlbumsItemsDataCoverartSources {
    url: string;
    width: number;
    height: number;
}

export interface RootObjectAlbumsItemsDataCoverart {
    sources: RootObjectAlbumsItemsDataCoverartSources[];
}

export interface RootObjectAlbumsItemsDataDate {
    year: number;
}

export interface RootObjectAlbumsItemsData {
    uri: string;
    name: string;
    artists: RootObjectAlbumsItemsDataArtists;
    coverArt: RootObjectAlbumsItemsDataCoverart;
    date: RootObjectAlbumsItemsDataDate;
}

export interface RootObjectAlbumsItems {
    data: RootObjectAlbumsItemsData;
}

export interface RootObjectAlbums {
    totalCount: number;
    items: RootObjectAlbumsItems[];
}

export interface ArtistRootObject {
    albums: RootObjectAlbums;
}




export interface BrowseSectionContainer {
    uri: string;
    data: {
        __typename: string;
        title: {
            transformedLabel: string;
        };
    };
    sectionItems: {
        items: {
            uri: string;
            content: {
                __typename: string;
                data?: {
                    __typename: string;
                    data?:{
                        cardRepresentation?: {
                            title?: {
                                transformedLabel: string;
                            };
                            artwork?: {
                                sources?: {
                                    url: string;
                                    width: number;
                                    height: number;
                                }[];
                            };
                            backgroundColor?: {
                                hex: string;
                            };
                        };
                    }

                };
            };
        }[];
    };
}

export interface BrowseStartData {
    data: {
        browseStart: {
            __typename: string;
            uri: string;
            sections: {
                items: BrowseSectionContainer[];
            };
        };
    };
}


export interface External_urls {
    spotify: string;
}

export interface ArtistsItem {
    external_urls: External_urls;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface ImagesItem {
    height: number;
    url: string;
    width: number;
}

export interface Album {
    album_type: string;
    artists: ArtistsItem[];
    available_markets: string[];
    external_urls: External_urls;
    id: string;
    images: ImagesItem[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface External_ids {
    isrc: string;
}

export interface TracksItem {
    album: Album;
    artists: ArtistsItem[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: number;
    external_ids: External_ids;
    external_urls: External_urls;
    id: string;
    is_local: number;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export interface SeedsItem {
    initialPoolSize: number;
    afterFilteringSize: number;
    afterRelinkingSize: number;
    id: string;
    type: string;
}

export interface RecommendationsRoot {
    tracks: TracksItem[];
    seeds: SeedsItem[];
}



export interface Followers{
    href: string;
    total: number;
}
export interface Genres{
    name: string;
    1: string;
    3: string;
}


export interface Artist{
    external_urls: External_urls;
    followers: Followers;
    genres: Genres[];
    id: string;
    images: ImagesItem[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface ArtistRoot{
    artists: Artist[];
}

