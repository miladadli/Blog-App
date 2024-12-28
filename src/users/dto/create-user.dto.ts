import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  roles: Role[];

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;
}
