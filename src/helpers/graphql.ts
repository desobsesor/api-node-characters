import { gql } from 'apollo-server-express';
import { Character } from '../models/character';
import { Origin } from '../models/origin';
import { Location } from '../models/location';
//GraphQl
export const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    status: String!
    species: String!
    gender: String!
    origin: Origin
    location: Location
    image: String!
    episode: [String]!
    url: String!
  }

  type Origin {
    name: String!
    url: String!
  }

  type Location {
    name: String!
    url: String!
  }

  type Query {
    characters(
      status: String
      species: String
      gender: String!
      name: String!
      origin: String!
    ): [Character!]!
  }
`;

export const resolvers = {
  Query: {
    characters: async (_, { status, species, gender, name, origin }) => {
      Character.belongsTo(Origin, { foreignKey: "origin" });
      Origin.hasMany(Character, { foreignKey: "origin" })
      Character.belongsTo(Location, { foreignKey: "location" });
      Location.hasMany(Character, { foreignKey: "location" })

      const characters = await Character.findAll({
        where: {
          status,
          species,
          gender,
          name,
          origin,
        },
        include: [{
          model: Origin,
          attributes: ["name", "url"],
        },
        {
          model: Location,
          attributes: ["name", "url"],
        }]
      });

      return characters;
    },
  },
};