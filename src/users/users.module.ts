import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { FirebaseModule } from '../firebase/firebase.module';
import { DataSource } from 'typeorm';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FirebaseModule],
  providers: [
    UsersService,
    FirebaseAuthGuard,
    RolesGuard,
    {
      provide: 'UsersRepository',
      useFactory: (dataSource: DataSource) => new UsersRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [UsersController],
  exports: [UsersService, 'UsersRepository'],
})
export class UsersModule {}
