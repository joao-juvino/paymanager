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

    res.cookie('access_token', data.accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax', 
      maxAge: 1000 * 60 * 60 * 24,
    })

    return data.user;
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


