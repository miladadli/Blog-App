import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from '../firebase/firebase.strategy';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthController } from './auth.controller';
import { FirebaseClientService } from '../firebase/firebase-client.service';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase' }),
    FirebaseModule,
  ],
  providers: [FirebaseStrategy, FirebaseService, FirebaseClientService],
  exports: [PassportModule],
})
export class AuthModule {}
