import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  create(data: { email: string; password: string; name?: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  updateRefreshToken(userId: number, token: string | null) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: token },
    });
  }
}