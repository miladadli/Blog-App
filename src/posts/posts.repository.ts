import { DataSource, Repository } from 'typeorm';
import { Post as BlogPost } from './post.entity';

export class PostsRepository extends Repository<BlogPost> {
  constructor(dataSource: DataSource) {
    super(BlogPost, dataSource.createEntityManager());
  }
}
