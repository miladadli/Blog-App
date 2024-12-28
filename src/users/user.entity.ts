import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column('simple-array')
  roles: Role[];

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;
}
