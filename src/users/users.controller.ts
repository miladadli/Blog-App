import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Logger,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/roles.decorator';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('users')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  private readonly superAdminEmail = process.env.SUPER_ADMIN_EMAIL;

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles('admin')
  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createUser(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.email === this.superAdminEmail) {
      throw new BadRequestException(
        'Cannot create a user with the Super Admin email',
      );
    }

    const user = new User();
    user.email = createUserDto.email;
    user.roles = createUserDto.roles;
    user.firstName = createUserDto.firstName || null;
    user.lastName = createUserDto.lastName || null;
    return this.usersService.create(user, createUserDto.password);
  }

  @Roles('admin')
  @Put(':email/roles')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async updateUserRoles(
    @Param('email') email: string,
    @Body() updateRolesDto: UpdateRolesDto,
  ) {
    if (email === this.superAdminEmail) {
      throw new BadRequestException(
        'Cannot update roles for the Super Admin email',
      );
    }

    return this.usersService.updateUserRoles(email, updateRolesDto.roles);
  }

  @Roles('admin')
  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
