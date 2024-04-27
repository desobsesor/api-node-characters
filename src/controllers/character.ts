import { createClient } from "redis";
import log4js from "log4js";
import { Character, FCharacter, MCharacter } from "../models/character";

import NodeCache from "node-cache";
import { Origin } from "../models/origin";
import { Location } from "../models/location";
import {
  getAllCharactersByRickAndMorty,
  getAllEpisodesRickAndMorty,
  getAllLocationRickAndMorty,
} from "../services/character";
import { Episode, FEpisode, MEpisode } from "../models/episode";

const cache = new NodeCache({ stdTTL: 3600 });

const logger = log4js.getLogger("default");

const cacheTTL = 3600;

const redisClient = createClient();
(async () => {
  await redisClient.connect();
})();

export const getSearhByCharacters = async (req: any, res: any) => {
  try {
    const { status, species, gender, name } = req.query;
    const cacheKey = `character?status=${status}&species=${species}&gender=${gender}&name=${name}`;

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      logger.info("Getting characters data from cache");
      return res.status(201).json(JSON.parse(cachedData));
    }

    const response = await getAllCharactersByRickAndMorty();

    const cacheValue = JSON.stringify(response.data.results);
    await redisClient.set(cacheKey, cacheValue, { EX: cacheTTL });

    res.status(201).json(response.data.results);
  } catch (error) {
    logger.error("Error when querying characters", { statusCode: 500 });
    res.status(500).json({ error: "Error when querying characters" });
  }
};

export const getAllCharacters = async (req: any, res: any) => {
  try {
    Character.belongsTo(Origin, { foreignKey: "origin" });
    Origin.hasMany(Character, { foreignKey: "origin" });
    Character.belongsTo(Location, { foreignKey: "location" });
    Location.hasMany(Character, { foreignKey: "location" });
    Character.belongsTo(Episode, { foreignKey: "episode" });
    Episode.hasMany(Character, { foreignKey: "episode" });

    const characters = await Character.findAll({
      include: [Origin, Location, Episode],
    });
    res.status(200).json(characters);
  } catch (error) {
    logger.error("Error getting all characters", { statusCode: 500 });
    res.status(500).json({ error: "Error getting all characters" });
  }
};

export const getCharacterById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    Character.belongsTo(Origin, { foreignKey: "origin" });
    Origin.hasMany(Character, { foreignKey: "origin" });
    Character.belongsTo(Location, { foreignKey: "location" });
    Location.hasMany(Character, { foreignKey: "location" });
    Character.belongsTo(Episode, { foreignKey: "episode" });
    Episode.hasMany(Character, { foreignKey: "episode" });

    const character = await Character.findByPk(id, {
      include: [Origin, Location, Episode],
    });

    if (!character) {
      res.status(200).json({ msg: "Not found character by ID" });
      return;
    }

    res.status(200).json(character);
  } catch (error) {
    logger.error("Error when searching character by ID", { statusCode: 500 });
    res.status(500).json({ error: "Error when searching character by ID" });
  }
};

export const getCharacterByName = async (req: any, res: any) => {
  const { name } = req.params;
  try {
    const character = await Character.findOne({
      where: { name },
    });

    if (!character) {
      res.status(200).json({ msg: "Not found character by Name" });
    }

    res.status(200).json(character);
  } catch (error) {
    logger.error("Error when searching character by Name", { statusCode: 500 });
    res.status(500).json({ error: "Error when searching character by Name" });
  }
};

export const setInitialCharacterData = async (req: any, res: any) => {
  try {
    await Episode.sync({ force: true });
    const responseEpisode = await getAllEpisodesRickAndMorty();
    const episodes: MEpisode[] = responseEpisode.data.results;
    const episodes_: FEpisode[] = [];
    episodes.forEach((element) => {
      const episode: FEpisode = {
        episode: element.id,
        episodes: element.characters,
      };
      episodes_.push(episode);
    });
    await Episode.bulkCreate(episodes_);

    await Location.sync({ force: true });
    const responseLocation = await getAllLocationRickAndMorty();
    await Location.bulkCreate(responseLocation.data.results);

    await Origin.sync({ force: true });
    const responseOrigin = await getAllLocationRickAndMorty();
    await Origin.bulkCreate(responseOrigin.data.results);

    await Character.sync({ force: true });
    const response = await getAllCharactersByRickAndMorty();

    const characters: MCharacter[] = response.data.results;
    const characters_: FCharacter[] = [];

    const promises: any[] = [];
    characters.forEach((element) => {
      promises.push(
        Promise.all([
          Origin.findOne({ where: { name: element.origin.name } }),
          Location.findOne({ where: { name: element.location.name } }),
          Episode.findOne({ where: { episodes: element.episode } }),
        ]),
      );
    });

    const results = await Promise.all(promises);

    characters.forEach((element, index) => {
      const [modifiedOrigin, modifiedLocation, modifiedEpisode] =
        results[index];
      const character: FCharacter = {
        id: element.id,
        name: element.name,
        status: element.status,
        species: element.species,
        gender: element.gender,
        image: element.image,
        url: element.url,
        created: element.created,
        episode: modifiedEpisode?.dataValues?.episode ?? 1,
        origin: modifiedOrigin?.dataValues?.origin || 1,
        location: modifiedLocation?.dataValues?.location || 1,
        type: element.type,
      };

      characters_.push(character);
    });

    await Character.bulkCreate(characters_);

    logger.info("Initial characters data has been loaded into the database");
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Initial characters data has been loaded into the database",
    });
  } catch (error) {
    logger.error("Error loading initial character data", { statusCode: 500 });
    res
      .status(500)
      .json({ error: "Error loading initial character data", message: error });
  }
};

export const setCharacter = async (req: any, res: any) => {
  const {
    status,
    species,
    gender,
    name,
    origin,
    location,
    image,
    episode,
    url,
    created,
  } = req.body;

  try {
    await Character.sync();
    await Character.create({
      status,
      species,
      gender,
      name,
      origin,
      location,
      image,
      episode,
      url,
      created,
    });

    logger.info("Character add to DB");
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Character add to DB",
    });
  } catch (error) {
    logger.error("Error when querying characters", { statusCode: 500 });
    res.status(500).json({ error: "Error when querying characters" });
  }
};

export const updateCharacter = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    status,
    species,
    gender,
    name,
    origin,
    location,
    image,
    episode,
    url,
  } = req.body;
  const redisChannel = "register_changes";

  try {
    const characterUpdate = await Character.update(
      {
        status,
        species,
        gender,
        name,
        origin,
        location,
        image,
        episode,
        url,
      },
      {
        where: {
          id: id,
        },
      },
    );
    const dataCharacter = {
      status,
      species,
      gender,
      name,
      origin,
      location,
      image,
      episode,
      url,
    };
    cache.set(id, dataCharacter);

    await redisClient.publish(
      redisChannel,
      JSON.stringify({ id, dataCharacter }),
    );
    logger.info("Character upate in DB");
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Character info has update en DB",
      characterUpdate,
    });
  } catch (error) {
    logger.error("Error when updating character", { statusCode: 500 });
    res.status(500).json({ error: "Error when updating characters" });
  }
};

export const deleteCharacterById = async (req: any, res: any) => {
  const redisChannel = "register_deletes";
  const id = req.params.id;
  try {
    const character = await Character.destroy({
      where: {
        id,
      },
    });

    const dataCharacter = { id };
    cache.set(id, dataCharacter);

    await redisClient.publish(
      redisChannel,
      JSON.stringify({ id, dataCharacter }),
    );
    logger.info("Character delete to DB");
    res.status(200).json({
      ok: true,
      status: 204,
      message: "Character delete to DB",
      character,
    });
  } catch (error) {
    logger.error("Error when delete character by id", { statusCode: 500 });
    res.status(500).json({ error: "Error when delete character by id" });
  }
};
