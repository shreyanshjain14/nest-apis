import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'database/database.module';
import { UserExistsRule } from './validators/isUserExists';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, UserExistsRule],
  imports: [DatabaseModule],
})
export class UserModule {}
