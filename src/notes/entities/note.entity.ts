import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

@Table
export class Note extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT
    })
    id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    content: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false
    })
    archived: boolean;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

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