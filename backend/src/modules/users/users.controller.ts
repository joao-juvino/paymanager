import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import * as Express from 'express';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll(@Query() query: UsersQueryDto, @Req() req: Express.Request) {
    const user = await this.getUserFromToken(req);

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }

    return this.usersService.findAll(query);
  }

  @Post()
  async create(@Body() dto: CreateUserDto, @Req() req: Express.Request) {
    const user = await this.getUserFromToken(req);

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to create users');
    }

    return this.usersService.create(dto);
  }

  @Patch(':id/role')
  async updateRole(
    @Param('id') id: string,
    @Body() dto: UpdateUserRoleDto,
    @Req() req: Express.Request,
  ) {
    const user = await this.getUserFromToken(req);

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to change roles');
    }

    return this.usersService.updateRole(Number(id), user.id, dto.role);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateUserStatusDto,
    @Req() req: Express.Request,
  ) {
    const user = await this.getUserFromToken(req);

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to change user status');
    }

    return this.usersService.updateStatus(Number(id), user.id, dto.isActive);
  }

  private async getUserFromToken(req: Express.Request) {
    const token = req.cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    return this.authService.validateToken(token);
  }
}