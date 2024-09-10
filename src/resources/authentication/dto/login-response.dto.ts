import { User } from '../../users/entities/user.entity';

export class LoginResponseDTO {
  access_token: string;
  user: User;
}
