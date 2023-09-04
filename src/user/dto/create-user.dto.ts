import { isEmail, isNotEmpty } from '@nestjs/class-validator';
import { IsNotEmpty, Validate } from 'class-validator';
import { UserExistsRule } from '../validators/isUserExists';
export class LoginDto {
  @Validate(UserExistsRule)
  @IsNotEmpty()
  userName: string;
  password: string;
}
