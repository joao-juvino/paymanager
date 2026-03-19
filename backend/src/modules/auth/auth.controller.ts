import { Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as Express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Express.Response
  ) {
    const data = await this.authService.login(dto);

    // Cookie do access token
    res.cookie('access_token', data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    // Cookie do refresh token
    res.cookie('refresh_token', data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // Ex.: 7 dias
    });

    return data.user;
  }

  @Post('refresh')
  async refresh(@Req() req: Express.Request, @Res({ passthrough: true }) res: Express.Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    try {
      const { user, accessToken } = await this.authService.refreshToken(refreshToken);

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24,
      });

      return user;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }


  @Get('me')
  async getMe(@Req() req: Express.Request) {
    const token = req.cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const user = await this.authService.validateToken(token);
      return { user };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

}


