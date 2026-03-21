import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersQueryDto } from './dto/users-query.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  updateRefreshToken(userId: number, token: string | null) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: token },
    });
  }

  async findAll(query: UsersQueryDto) {
    const where: Prisma.UserWhereInput = {};

    if (query.search?.trim()) {
      const search = query.search.trim();

      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { username: { contains: search } },
      ];
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 4;
    const skip = (page - 1) * limit;

    const [items, totalRecords, activeUsers] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          role: true,
          isActive: true,
          lastActivityAt: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count({ where }),
      this.prisma.user.count({
        where: {
          ...where,
          isActive: true,
        },
      }),
    ]);

    return {
      items: items.map((user) => ({
        id: user.id,
        name: user.name ?? '-',
        username: user.username ?? user.email,
        role: user.role,
        status: user.isActive ? 'Active' : 'Inactive',
        lastActivity: user.lastActivityAt?.toISOString() ?? user.createdAt.toISOString(),
      })),
      meta: {
        page,
        limit,
        totalRecords,
        totalPages: Math.max(1, Math.ceil(totalRecords / limit)),
      },
      statistics: {
        activeUsers,
        totalRecords,
      },
    };
  }

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          ...(dto.username ? [{ username: dto.username }] : []),
        ],
      },
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        name: dto.name,
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        isActive: true,
        lastActivityAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        lastActivityAt: true,
        createdAt: true,
      },
    });
  }

  async updateRole(userId: number, currentUserId: number, role: Role) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (userId === currentUserId) {
      throw new ForbiddenException("You cannot change your own status");
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        lastActivityAt: true,
        createdAt: true,
      },
    });
  }

  async updateStatus(userId: number, currentUserId: number, isActive: boolean) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (userId === currentUserId) {
      throw new ForbiddenException("You cannot change your own status");
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        lastActivityAt: true,
        createdAt: true,
      },
    });
  }
}