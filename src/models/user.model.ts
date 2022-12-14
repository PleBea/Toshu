/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    AllowNull,
    Unique,
    PrimaryKey,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export default class Users extends Model {
    @AllowNull(false)
    @Unique(true)
    @PrimaryKey
    @Column(DataType.STRING)
    id!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    ttc!: number;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    ranking!: number;

    @CreatedAt
    @Column(DataType.DATE)
    createdAt!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt!: Date;
}
