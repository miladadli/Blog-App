import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-firebase-jwt';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor() {
    super({
      jwtFromRequest: (req) =>
        req.headers.authorization?.split('Bearer ')[1] || null,
    });
  }

  async validate(token: string) {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userRoles = decodedToken.roles || [];
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      roles: userRoles,
    };
  }
}
