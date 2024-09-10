import { Injectable } from '@nestjs/common';
import { User } from './resources/users/entities/user.entity';

@Injectable()
export class AppService {
  getHello(user: User) {
    return user;
  }
}
