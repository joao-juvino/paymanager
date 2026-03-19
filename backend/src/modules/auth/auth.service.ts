import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { env } from '../../config/env';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();

    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.usersService.create({
        email,
        password: hashedPassword,
        name: dto.name,
      });

      return this.generateTokens(user.id, user.email);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User already exists');
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      ...(await this.generateTokens(user.id, user.email)),
    };
  }

  private async generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: env.jwtAccessSecret,
      expiresIn: env.jwtAccessExpiration,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: env.jwtRefreshSecret,
      expiresIn: env.jwtRefreshExpiration,
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.usersService.updateRefreshToken(
      userId,
      hashedRefreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: env.jwtRefreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findById(payload.sub);

    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('User not found or no refresh token saved');
    }

    const isTokenValid = await bcrypt.compare(refreshToken, user.hashedRefreshToken);

    if (!isTokenValid) {
      throw new UnauthorizedException('Refresh token does not match');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      ...tokens,
    };
  }

  async validateToken(token: string) {
    const payload = this.jwtService.verify(token);
    const user = await this.usersService.findById(payload.sub);
    return {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      createdAt: user?.createdAt,
    };

  }
}