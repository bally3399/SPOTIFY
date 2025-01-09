import {ArtistRootObject, BrowseStartData} from "@/database.types";


export const getTracks = async (data: string)  => {

    const url = `https://spotify23.p.rapidapi.com/search/?q=${data}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '41e5498422msha2c43afe3d68e7ep1a57e9jsn99ff47cc6194',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const returnValues: ArtistRootObject = await response.json();
        return returnValues;
    } catch (error) {
        console.error(error);
    }
}

