import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { Origin } from './origin';
import { Location } from './location';

export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: string;
    location: string;
    image: string;
    episode: string;
    url: string;
    created: string;
}

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
            type: DataTypes.INTEGER.UNSIGNED, //FK
            allowNull: false,
            references: {
                model: Origin, // name of Target model
                key: 'origin', // key in Target model that we're referencing
            },
        },
        location: {
            type: DataTypes.INTEGER.UNSIGNED, //FK
            allowNull: false,
            references: {
                model: Location, // name of Target model
                key: 'location', // key in Target model that we're referencing
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        episode: {
            type: DataTypes.STRING,
            allowNull: true,
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
