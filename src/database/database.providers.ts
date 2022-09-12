import { Sequelize } from 'sequelize-typescript';
import { Note } from '../notes/entities/note.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'nest-db',
      });
      sequelize.addModels([Note]);
      await sequelize.sync();
      return sequelize;
    },
  },
];