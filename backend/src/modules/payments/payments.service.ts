import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatus } from '@prisma/client';

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

    async findMyPayments(userId: number) {
        return this.prisma.payment.findMany({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findPendingPayments() {
        return this.prisma.payment.findMany({
            where: { status: PaymentStatus.PENDING },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findAllPayments() {
        return this.prisma.payment.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateStatus(paymentId: number, status: PaymentStatus) {
        const payment = await this.prisma.payment.findUnique({
            where: { id: paymentId },
        });

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        if (payment.status !== PaymentStatus.PENDING) {
            throw new ConflictException('Only pending payments can be updated');
        }

        return this.prisma.payment.update({
            where: { id: paymentId },
            data: { status },
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