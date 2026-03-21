import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, PaymentStatus, Role } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HistoryQueryDto } from './dto/history-query.dto';

type CurrentUser = {
  id: number;
  role: Role;
};

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
        authorizedBy: {
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
        authorizedBy: {
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

  async findHistory(user: CurrentUser, query: HistoryQueryDto) {
    const where: Prisma.PaymentWhereInput = {};

    if (user.role !== Role.ADMIN && user.role !== Role.AUTHORIZATION) {
      where.userId = user.id;
    }

    if (query.startDate || query.endDate) {
      where.createdAt = {};
    }

    if (query.startDate) {
      where.createdAt = {
        ...(where.createdAt as Prisma.DateTimeFilter),
        gte: new Date(query.startDate),
      };
    }

    if (query.endDate) {
      const end = new Date(query.endDate);
      end.setHours(23, 59, 59, 999);

      where.createdAt = {
        ...(where.createdAt as Prisma.DateTimeFilter),
        lte: end,
      };
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const [items, totalRecords, pendingQueue, approvedCount, rejectedCount, approvedValues] =
      await Promise.all([
        this.prisma.payment.findMany({
          where,
          skip,
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
            authorizedBy: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.payment.count({ where }),
        this.prisma.payment.count({ where: { ...where, status: PaymentStatus.PENDING } }),
        this.prisma.payment.count({ where: { ...where, status: PaymentStatus.APPROVED } }),
        this.prisma.payment.count({ where: { ...where, status: PaymentStatus.REJECTED } }),
        this.prisma.payment.aggregate({
          where: { ...where, status: PaymentStatus.APPROVED },
          _sum: { amount: true },
        }),
      ]);

    const totalClosed = approvedCount + rejectedCount;
    const approvalRate = totalClosed > 0 ? (approvedCount / totalClosed) * 100 : 0;

    return {
      items: items.map((payment) => ({
        id: `PAY-${String(payment.id).padStart(4, '0')}`,
        date: payment.createdAt.toISOString(),
        beneficiary: {
          name: payment.companyName,
          cnpj: payment.cnpj,
        },
        value: payment.amount,
        requester: payment.user?.name ?? payment.user?.email ?? 'Unknown',
        authorizer: payment.authorizedBy?.name ?? payment.authorizedBy?.email ?? '-',
        status: payment.status,
      })),
      meta: {
        page,
        limit,
        totalRecords,
        totalPages: Math.max(1, Math.ceil(totalRecords / limit)),
      },
      statistics: {
        totalRecords,
        authorizedValues: approvedValues._sum.amount ?? 0,
        pendingQueue,
        approvalRate,
      },
    };
  }

  async updateStatus(paymentId: number, status: PaymentStatus, authorizerId: number) {
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
      data: {
        status,
        authorizedById: authorizerId,
        authorizedAt: new Date(),
      },
    });
  }

  private parseAmount(amount: string): number {
    return Number(
      amount
        .replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim(),
    );
  }
}