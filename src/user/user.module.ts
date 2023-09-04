import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'database/database.module';
import { UserExistsRule } from './validators/isUserExists';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtGuard } from './guards/jwtGuard';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, UserExistsRule, jwtGuard,jwtStrategy],
  imports: [
    DatabaseModule,
    JwtModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class UserModule {}
