import axios from "axios";
import { config } from "../config/config";
import { logMethodExecutionTime } from "../helpers/measureDecorator";

function isProductionEnvironment(env: string): env is "production" {
  return env === "production";
}

const environment: string = process.env.NODE_ENV || "development";

const configAPI = {
  baseURL: isProductionEnvironment(environment)
    ? config["production"].endpointAllCharacters
    : config["development"].endpointAllCharacters,
  baseURLRickAndMorty: isProductionEnvironment(environment)
    ? config["production"].apiRickAndMorty
    : config["development"].apiRickAndMorty,
};

const query = `
  query MyQuery($status: status!, $species: species!, $name: name!, $gender: gender!) {
    character(status: $status, species: $species, name: $name, gender: $gender) {
      name
      status
      species
      gender
    }
  }
`;

export const getAllCharactersByRickAndMorty = async () => {
  const response = await axios.get(
    `${configAPI.baseURLRickAndMorty}/character?page=2`,
  );
  return response;
};

export const getAllLocationRickAndMorty = async () => {
  const response = await axios.get(`${configAPI.baseURLRickAndMorty}/location`);
  return response;
};

export const getAllEpisodesRickAndMorty = async () => {
  const response = await axios.get(
    `${configAPI.baseURLRickAndMorty}/episode?page=1`,
  );
  return response;
};

export const getAllCharactersByRickAndMortyGraphQl = async (
  status: string,
  species: string,
  name: string,
  gender: string,
) => {
  const variables = { status, species, name, gender };

  const response = await axios.post(`${configAPI.baseURL}/graphql`, {
    data: {
      query,
      variables,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const getAllCharactersByRickAndMortyC = logMethodExecutionTime(
  getAllCharactersByRickAndMorty,
  "getAllCharactersByRickAndMorty",
  getAllCharactersByRickAndMorty,
);
