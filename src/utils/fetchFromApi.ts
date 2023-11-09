import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';
const characters = '/character';

export const getCharacters = async (page: number, name?: string) => {
    try {

        const response = await axios.get(`${BASE_URL}${characters}/?page=${page}&name=${name}`, { responseType: 'json' });

        if (response.status != 200) {
            throw new Error("Error when fecthing.");
        }

        return response.data;
    } catch (error) {
        console.error('Enable to get characters. ', error);
    }
}

export const filterCharactersByName = async (name: string) => {
    try {
        const response = await axios.get(`${BASE_URL}${characters}/?name=${name}`, { responseType: 'json' });

        if (response.status != 200) {
            throw new Error("Error when fecthing.");
        }

        return response.data;
    } catch (error) {
        console.error('Enable to get characters. ', error);
    }
}

export const getCharacterById = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}${characters}/${id}`, { responseType: 'json' });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }

    } catch (error) {
        console.error('Enable to get characters. ', error);
    }
}