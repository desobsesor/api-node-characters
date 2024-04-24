import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { MOrigin, Origin } from './origin';
import { Location, MLocation } from './location';
import { Episode, MEpisode } from './episode';

export type MCharacter = {
    id: number;
    name: string;
    status: string;
    location: MLocation;
    origin: MOrigin;
    type: string;
    episode: MEpisode;
    species: string;
    gender: string;
};

export  type FCharacter = {
    id: number;
    name: string;
    status: string;
    location: number;
    origin: number;
    type: string;
    episode: number;
    species: string;
    gender: string;
};

export class Character extends Model { }

Character.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        species: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        origin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Origin,
                key: 'origin',
            },
        },
        location: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Location,
                key: 'location',
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        episode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Episode, 
                key: 'episode', 
            },
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        modelName: 'Character',
    },
);
