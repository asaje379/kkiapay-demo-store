import { TransactionController } from './transaction.controller';
import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  imports: [PrismaModule],
})
export class TransactionModule {}
