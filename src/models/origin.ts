import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class Origin extends Model { }

Origin.init(
    {
        origin: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Origin',
    },
);
