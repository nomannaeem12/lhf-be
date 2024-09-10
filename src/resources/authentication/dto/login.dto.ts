import { IsNotEmpty } from '@nestjs/class-validator';

export class LoginDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
