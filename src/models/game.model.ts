/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    AllowNull,
    Unique,
    PrimaryKey,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export default class Games extends Model {
    @AllowNull(false)
    @Unique(true)
    @PrimaryKey
    @Column(DataType.STRING)
    id!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    player1!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    player2!: string;

    @CreatedAt
    @Column(DataType.DATE)
    createdAt!: Date;
}
