import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Env } from '../utils';
import { OrderPaymentStatus } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async handleWebhook(transactionId: string, data: string) {
    const kkpData = await this.verifyTransaction(transactionId);

    if (kkpData.data.status === 'SUCCESS') {
      const order = await this.prisma.order.update({
        where: { id: data },
        data: { paymentStatus: OrderPaymentStatus.PAID },
        include: { articles: { include: { article: true } } },
      });

      // Send amount to vendor
      for (const orderArticle of order.articles) {
        const vendorId = orderArticle.article.vendorId;
        const vendorAmount =
          orderArticle.article.amount * orderArticle.quantity;
        await this.sendAmountToVendor(vendorId, vendorAmount);
      }

      await this.prisma.order.update({
        where: { id: order.id },
        data: { vendorPaymentStatus: OrderPaymentStatus.PAID },
      });
      return { order, success: true };
    }
  }

  async verifyTransaction(transactionId: string) {
    const { statusUrl, apiKey } = Env.transaction;

    try {
      const sandboxResponse = await axios.post(
        statusUrl.sandbox,
        {
          transactionId,
        },
        { headers: { 'x-api-key': apiKey.sandbox } },
      );
      return { data: sandboxResponse.data, mode: 'SANDBOX' };
    } catch (error) {
      try {
        const liveResponse = await axios.post(
          statusUrl.live,
          {
            transactionId,
          },
          { headers: { 'x-api-key': apiKey.live } },
        );
        return { data: liveResponse.data, mode: 'LIVE' };
      } catch (error) {
        throw { statusCode: 400, message: 'Invalid transaction Id' };
      }
    }
  }

  async sendAmountToVendor(vendorId: string, amount: number) {
    console.log(`Sending ${amount} to ${vendorId}`);
  }
}
