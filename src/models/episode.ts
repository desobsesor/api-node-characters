import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export type MEpisode = {
    id: Number;
    characters: JSON;
};

export class Episode extends Model { }

Episode.init(
    {
        episode: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        episodes: {
            type: DataTypes.JSON,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Episode',
    }
);