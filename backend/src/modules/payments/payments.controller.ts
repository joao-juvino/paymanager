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
import { Role, PaymentStatus } from '@prisma/client';
import * as Express from 'express';
import { AuthService } from '../auth/auth.service';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { HistoryQueryDto } from './dto/history-query.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() dto: CreatePaymentDto, @Req() req: Express.Request) {
    const user = await this.getUserFromToken(req);
    return this.paymentsService.create(dto, user.id);
  }

  @Get('mine')
  async findMyPayments(@Req() req: Express.Request) {
    const user = await this.getUserFromToken(req);
    return this.paymentsService.findMyPayments(user.id);
  }

  @Get('pending')
  async findPendingPayments(@Req() req: Express.Request) {
    const user = await this.getUserFromToken(req);

    if (user.role !== Role.AUTHORIZATION && user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to view pending payments');
    }

    return this.paymentsService.findPendingPayments();
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentStatusDto,
    @Req() req: Express.Request,
  ) {
    const user = await this.getUserFromToken(req);

    if (user.role !== Role.AUTHORIZATION && user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to authorize payments');
    }

    return this.paymentsService.updateStatus(Number(id), dto.status, user.id);
  }

  @Get('history')
  async findHistory(@Query() query: HistoryQueryDto, @Req() req: Express.Request) {
    const user = await this.getUserFromToken(req);
    return this.paymentsService.findHistory(user, query);
  }

  @Get('all')
  async findAllPayments(@Req() req: Express.Request) {
    const user = await this.getUserFromToken(req);

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }

    return this.paymentsService.findAllPayments();
  }

  private async getUserFromToken(req: Express.Request) {
    const token = req.cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    return this.authService.validateToken(token);
  }
}