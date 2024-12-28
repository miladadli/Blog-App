import { IsArray, ArrayNotEmpty, IsEnum } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class UpdateRolesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  roles: Role[];
}
