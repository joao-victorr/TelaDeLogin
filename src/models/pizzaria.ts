import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instaces/mysql";
import bcrypt from "bcryptjs";

const salt = 10;

export interface PizzariaUserInterface extends Model {

    id: number,
    name: string,
    email: string,
    password: string

};

export const PizzariaUsers = sequelize.define<PizzariaUserInterface>('PizzariaUsers', {

    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        set(value: string) {
            let hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash)
        }
        
    }
}, {
    tableName: "users",
    timestamps: false,
})