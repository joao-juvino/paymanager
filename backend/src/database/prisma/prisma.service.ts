import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from '../../config/env';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const options = {

      datasources: {
        db: {
          url: env.databaseUrl ?? process.env.DATABASE_URL,
        },
      },
    } as any;

    super(options);
  }

  async onModuleInit() {
    await this.$connect();
  }
}