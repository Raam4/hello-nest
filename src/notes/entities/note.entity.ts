import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

@Table
export class Note extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column
    title: string;

    @Column
    content: string;

    @Column({
        defaultValue: false,
        allowNull: false
    })
    archived: boolean;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}