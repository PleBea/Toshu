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
        type: DataType.NUMBER,
        defaultValue: 0,
    })
    TTC!: number;

    @CreatedAt
    @Column(DataType.DATE)
    createdAt!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt!: Date;
}
