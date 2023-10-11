import { ApiProperty } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { Controller, Post, Body } from '@nestjs/common';

export class VerifyTransactionPayload {
  @ApiProperty() transactionId: string;
  @ApiProperty() data: string;
}

@Controller('transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Post('webhook')
  async verify(@Body() { transactionId, data }: VerifyTransactionPayload) {
    return await this.service.handleWebhook(transactionId, data);
  }
}
