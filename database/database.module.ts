import { Global, Module } from '@nestjs/common';
import { UserModel } from './models/user.model';
const Knex = require('knex'); // facing issue with types
import config from 'knexfile';
import { Model, knexSnakeCaseMappers } from 'objection';

const models = [UserModel];

const modelProviders = models.map((m) => {
  return {
    provide: m.name,
    useValue: m,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex(config.development);
      Model.knex(knex);
      return knex;
    },
    ...knexSnakeCaseMappers(),
  },
];
@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
