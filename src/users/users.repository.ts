import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
