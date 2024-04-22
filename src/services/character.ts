import axios from 'axios';
import { config } from '../config/config';
import { logMethodExecutionTime } from '../helpers/measureDecorator';

const environment = process.env.NODE_ENV || 'development';

const configAPI = {
    baseURL: config[environment].apiRickAndMorty,
};

export const getAllCharactersByRickAndMorty = async (status: string, species: any, gender: string, name: string, origin: any) => {
    const response = await axios.get(`${configAPI.baseURL}/api/character`, {
        params: {
            status,
            species,
            gender,
            name,
            origin,
        },
    });
    return response;
};

export const getAllCharactersByRickAndMortyC = logMethodExecutionTime(getAllCharactersByRickAndMorty, 'getAllCharactersByRickAndMorty', getAllCharactersByRickAndMorty);