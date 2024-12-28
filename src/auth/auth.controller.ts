import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseClientService } from '../firebase/firebase-client.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseClientService: FirebaseClientService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const token = await this.firebaseClientService.signIn(email, password);
    return { token };
  }
}
