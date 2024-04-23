import { createClient } from 'redis';
import log4js from 'log4js';
import { Character } from '../models/character';


import NodeCache from 'node-cache';
import { Origin } from '../models/origin';
import { Location } from '../models/location';
import { getAllCharactersByRickAndMortyGraphQl } from '../services/character';

const cache = new NodeCache({ stdTTL: 3600 });

const logger = log4js.getLogger('default');

const cacheTTL = 3600;

const redisClient = createClient();
(async () => {
    await redisClient.connect();
})();

export const getSearhByCharacters = async (req: any, res: any) => {
    try {
        const { status, species, gender, name, origin } = req.body;

        const cacheKey = `character?status=${status}&species=${species}&gender=${gender}&name=${name}&origin=${origin}`;

        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) { 
            logger.info('Getting characters data from cache');
            return res.status(201).json(JSON.parse(cachedData));
        }

        const response = await getAllCharactersByRickAndMortyGraphQl( status, species, gender, name, origin );

        const cacheValue = JSON.stringify(response.data.results);
        await redisClient.set(cacheKey, cacheValue, { EX: cacheTTL }); 

        res.status(201).json(response.data.results);
    } catch (error) {
        logger.error('Error when querying characters', { statusCode: 500});
        res.status(500).json({ error: 'Error when querying characters' });
    }
};

export const getAllCharacters = async (req: any, res: any) => {
    try {
        Character.belongsTo(Origin, { foreignKey: "origin" });
        Origin.hasMany(Character, { foreignKey: "origin" })
        Character.belongsTo(Location, { foreignKey: "location" });
        Location.hasMany(Character, { foreignKey: "location" })

        const characters = await Character.findAll({
            include: [Origin, Location]
        });
        res.status(200).json(characters);
    } catch (error) {
        
        logger.error('Error getting all characters', { statusCode: 500});
        res.status(500).json({ error: 'Error getting all characters' });
    }
};

export const getCharacterById = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const character = await Character.findByPk(id);
        res.status(200).json(character);
    } catch (error) {
        
        logger.error('Error when searching character by ID', { statusCode: 500});
        res.status(500).json({ error: 'Error when searching character by ID' });
    }
};

export const getCharacterByName = async (req: any, res: any) => {
    const { name } = req.params;
    try {
        const character = await Character.findOne({
            where: { name },
        });
        res.status(200).json(character);
    } catch (error) {
        
        logger.error('Error when searching character by Name', { statusCode: 500});
        res.status(500).json({ error: 'Error when searching character by Name' });
    }
};

export const setCharacter = async (req: any, res: any) => {
    const { status, species, gender, name, origin, location, image, episode, url, created } = req.body;

    try {
        await Character.sync()
        await Character.create({
            status, species, gender, name, origin, location, image, episode, url, created
        });
        
        logger.info('Character add to DB');
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Character add to DB'
        });
    } catch (error) {
        logger.error('Error when querying characters', { statusCode: 500});
        res.status(500).json({ error: 'Error when querying characters' });
    }
};

export const updateCharacter = async (req: any, res: any) => {

    const { id } = req.params;
    const { status, species, gender, name, origin, location, image, episode, url } = req.body;
    const redisChannel = 'register_changes';

    try {
        const characterUpdate = await Character.update({
            status, species, gender, name, origin, location, image, episode, url
        }, {
            where: {
                id: id
            }
        });
        const dataCharacter = { status, species, gender, name, origin, location, image, episode, url };
        cache.set(id, dataCharacter);

        await redisClient.publish(redisChannel, JSON.stringify({ id, dataCharacter }));
        logger.info('Character upate in DB');
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Character info has update en DB',
            characterUpdate
        });
    } catch (error) {
        logger.error('Error when updating character', { statusCode: 500});
        res.status(500).json({ error: 'Error when updating characters' });
    }
};

export const deleteCharacterById = async (req: any, res: any) => {
    const redisChannel = 'register_deletes';
    const id = req.params.id;
    try {
        const character = await Character.destroy({
            where: {
                id
            },
        });

        const dataCharacter = { id };
        cache.set(id, dataCharacter);

        await redisClient.publish(redisChannel, JSON.stringify({ id, dataCharacter }));
        logger.info('Character delete to DB');
        res.status(200).json({
            ok: true,
            status: 204,
            message: 'Character delete to DB',
            character
        });
    } catch (error) {
        
        logger.error('Error when delete character by id', { statusCode: 500});
        res.status(500).json({ error: 'Error when delete character by id' });
    }
};

