import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signup.dto';

import { IsPublic } from 'src/shared/decorators/IsPublic';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  create(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
