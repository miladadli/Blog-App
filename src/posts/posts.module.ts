import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post as BlogPost } from './post.entity';
import { PostsRepository } from './posts.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { FirebaseModule } from '../firebase/firebase.module';
import { DataSource } from 'typeorm';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    FirebaseModule,
  ],
  providers: [
    PostsService,
    FirebaseAuthGuard,
    RolesGuard,
    {
      provide: 'PostsRepository',
      useFactory: (dataSource: DataSource) => new PostsRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [PostsController],
})
export class PostsModule {}
