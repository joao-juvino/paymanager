import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UnauthorizedException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import * as Express from 'express';
import { AuthService } from '../auth/auth.service';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly authService: AuthService,
    ) { }

    @Post()
    async create(
        @Body() dto: CreatePaymentDto,
        @Req() req: Express.Request
    ) {
        const token = req.cookies['access_token'];

        if (!token) {
            throw new UnauthorizedException('No token found');
        }

        const user = await this.authService.validateToken(token);

        return this.paymentsService.create(dto, user.id);
    }

    @Get()
    async findMyPayments(@Req() req: Express.Request) {
        const token = req.cookies['access_token'];

        if (!token) {
            throw new UnauthorizedException('No token found');
        }

        const user = await this.authService.validateToken(token);

        return this.paymentsService.findAllByUser(user.id);
    }
}