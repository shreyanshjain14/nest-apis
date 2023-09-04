
import {} from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

export class jwtGuard extends AuthGuard('jwt'){
    constructor(protected readonly jwtService:JwtService){super()}
}