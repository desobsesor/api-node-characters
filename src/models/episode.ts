import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export type MEpisode = {
    id: number;
    characters: JSON;
};

export type FEpisode = {
    episode: number;
    episodes: JSON;
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
