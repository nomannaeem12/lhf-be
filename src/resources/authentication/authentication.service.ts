import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterRequestDto } from './dto/register-request.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginResponseDTO } from './dto/login-response.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user: User = await this.usersService.findOneByEmail(email, true);
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials');
    }
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  async login(user: User): Promise<LoginResponseDTO> {
    const payload = { ...user };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
  async register(user: RegisterRequestDto) {
    const existingUser = await this.usersService.findOneByEmail(
      user.email,
      false,
    );
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: CreateUserDto = { ...user, password: hashedPassword };
    return await this.usersService.create(newUser);
  }
}
