import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreatePaymentDto, userId: number) {
        return this.prisma.payment.create({
            data: {
                cnpj: dto.cnpj,
                companyName: dto.companyName,
                amount: this.parseAmount(dto.amount),
                description: dto.description,
                userId,
            },
        });
    }

    async findAllByUser(userId: number) {
        return this.prisma.payment.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    private parseAmount(amount: string): number {
        // "R$ 1.234,56" -> 1234.56
        return Number(
            amount
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim()
        );
    }
}