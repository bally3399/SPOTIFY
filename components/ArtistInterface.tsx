export interface Artist {
    id: string;
    name: string;
    genre: string;
    bio?: string;
    albums?: string[];
    imageUrl?: string;
    birthDate?: string;
    nationality?: string;
    followers: number
}
// export interface Track{
//     length: number;
//     name: string;
//     genre: string;
//     bio?: string;
//     albums?: string[];
//     imageUrl?: string;
//     artists: { name: string }[];
// }

export interface Track {
    tracks: TrackDetail[];
}

export interface TrackDetail {
    album: Album;
    id: string;
    name: string;
    popularity: number;
    preview_url: string | null;
    uri: string;
}

export interface Album {
    album_type: string;
    artists: Artist_Root[];
    external_urls: ExternalUrl;
    id: string;
    images: Image[];
}

export interface Artist_Root {
    external_urls: ExternalUrl;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface ExternalUrl {
    spotify: string;
}

export interface Image {
    url: string;
    width: number;
    height: number;
}
