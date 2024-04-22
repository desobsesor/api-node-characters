import axios from 'axios';
import { config } from '../config/config';
import { logMethodExecutionTime } from '../helpers/measureDecorator';

function isProductionEnvironment(env: string): env is 'production' {
	return env === 'production';
}

const environment: string = process.env.NODE_ENV || 'development';

const configAPI = {
	baseURL: isProductionEnvironment(environment)
		? config['production'].endpointAllCharacters
		: config['development'].endpointAllCharacters
};

const query = `
  query MyQuery($status: status!, $species: species!, $name: name!, $gender: gender!, $origin: origin!) {
    character(status: $status, species: $species, name: $name, gender: $gender, origin: $origin) {
      name
      status
      species
      gender
      origin {
        name
      }
      episode {
        name
      }
    }
  }
`;

export const getAllCharactersByRickAndMorty = async (status: string, species: any, gender: string, name: string, origin: any) => {
    const response = await axios.get(`${configAPI.baseURL}/api/character/?page=2`, {
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

export const getAllCharactersByRickAndMortyGraphQl = async (status: string, species: any, gender: string, name: string, origin: any) => {
    console.log('Bodys:');
    const variables = { status, species, gender, name, origin };

    const response = await axios.post(`${configAPI.baseURL}/graphql`, {
        data: {
            query,
            variables
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = response.data;
    const character = data.data.character; // Extract the character data

    console.log(`Character name: ${character.name}`);
    console.log(`Character status: ${character.status}`);

    return response;
};

export const getAllCharactersByRickAndMortyC = logMethodExecutionTime(getAllCharactersByRickAndMorty, 'getAllCharactersByRickAndMorty', getAllCharactersByRickAndMorty);