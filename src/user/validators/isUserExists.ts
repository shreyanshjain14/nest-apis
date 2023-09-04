import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'database/models/user.model';
import { ModelClass } from 'objection';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(@Inject('UserModel') private usersModel: ModelClass<UserModel>) {}

  async validate(value: string) {
    try {
      console.log('sdshjfv');
      await this.usersModel.query().findOne({ userName: value });
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist`;
  }
}
