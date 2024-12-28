import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FirebaseClientService {
  private app;
  private auth;

  constructor() {
    this.app = initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    });
    this.auth = getAuth(this.app);
  }

  async signIn(email: string, password: string): Promise<string> {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
    const token = await userCredential.user.getIdToken();
    return token;
  }
}
