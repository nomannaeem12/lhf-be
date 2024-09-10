import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponseDTO } from './dto/login-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { User } from '../users/entities/user.entity';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req): Promise<LoginResponseDTO | BadRequestException> {
    return this.authenticationService.login(req.user);
  }
  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<User | BadRequestException> {
    return await this.authenticationService.register(registerBody);
  }
}
