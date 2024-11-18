'use client'
// @ts-ignore
import Stripe from 'stripes';

export interface UserDetails{
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    avatar: string;
    billing_address: Stripe.Address;
    payment_method: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}
export interface Artist{
    id: string;
    author: string;
    picture: string;
    description: string;
    followers: string;
    facebook: string;
    instagram: string;
    linkedIn: string;

}

export interface Song{
    id: string;
    title: string;
    song_url: string;
    image_url: string;
    user_id: string;
    artist_id: string;
}

export interface Product{
    id: string;
    active: boolean;
    name?: string;
    description?: string;
    image?: string;
    metadata: Stripe.Metadata;
}

export interface Price{
    id: string;
    product_id: string;
    active?: boolean;
    description?: string;
    unit_amount: number;
    currency: string;
    type?: Stripe.Price.Type;
    interval_count: number;
    interval?:Stripe.Price.Pecurring.Interval;
    trial_period_days?: number | null;
    metadata?: Stripe.Metadata;
    products?: Product
}

export interface ProductWithPrice extends Product{
    prices: Price[];
}

export interface Subscription{
    id: string;
    user_id: string;
    status: Stripe.Subscription.Status;
    metadata: Stripe.Metadata;
    price_id: string;
    Quantity: number;
    cancel_at_period_end?: boolean
    created: string;
    current_period_start: string;
    current_period_end: string;
    ended_at: string;
    cancel_at: string;
    canceled_at: string;
    trial_start: string;
    trial_end: string;
    prices?: Price

}
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
    artists: Artist[];
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
    artists: Artist[];
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
