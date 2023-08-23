import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login.user.input';
import { User } from 'src/users/entities/user.entity';
import { LoginResponse } from './dto/login.response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const result = {
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: user,
    };
    return result;
  }
}
