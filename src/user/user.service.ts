import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/create-user.dto';
import { UserModel } from 'database/models/user.model';
import { ModelClass } from 'objection';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ROLE } from './config';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModel') private userModel: ModelClass<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userModel
      .query()
      .findOne({ userName: data.userName });

    if (!user) {
      throw new HttpException('User does not exist', 404);
    }

    const isCorrectPassword = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      userName: user.userName,
    };

    const response = {
      userName: user.userName,
      token: this.jwtService.sign(payload),
    };
    return response;
  }

  async adminLogin(data: LoginDto) {
    const user = await this.userModel
      .query()
      .findOne({ userName: data.userName });

    if (!user) {
      throw new HttpException('User does not exist', 404);
    }

    if (user.role == ROLE.admin) {
      throw new UnauthorizedException();
    }
    const isCorrectPassword = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      userName: user.userName,
    };

    const response = {
      userName: user.userName,
      token: this.jwtService.sign(payload),
    };
    return response;
  }

  async findAllProducts() {
    return await this.userModel.query();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
