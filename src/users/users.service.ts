import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(user: User, password: string): Promise<User> {
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const userRecord = await admin.auth().createUser({
      email: user.email,
      password,
    });

    user.id = uuidv4();
    await admin
      .auth()
      .setCustomUserClaims(userRecord.uid, { roles: user.roles });
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.usersRepository.delete(id);
  }

  async updateUserRoles(email: string, roles: Role[]): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    user.roles = roles;
    await this.usersRepository.save(user);
    const firebaseUser = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(firebaseUser.uid, { roles });
    await admin.auth().revokeRefreshTokens(firebaseUser.uid);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
