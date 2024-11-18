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
export interface Track{
    length: number;
    name: string;
    genre: string;
    bio?: string;
    albums?: string[];
    imageUrl?: string;
    artists: { name: string }[];
}
