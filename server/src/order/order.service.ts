import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleWithQuantity {
  @ApiProperty() articleId: string;
  @ApiProperty() quantity: number;
}

export class InitOrderPayload {
  @ApiProperty() articles: ArticleWithQuantity[];
  @ApiProperty() totalAmount: number;
}

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.order.findMany({ include: { articles: true } });
  }

  async registerOrder(items: InitOrderPayload) {
    const order = await this.prisma.order.create({
      data: { totalAmount: items.totalAmount },
    });

    for (const item of items.articles) {
      await this.prisma.orderArticle.create({
        data: {
          orderId: order.id,
          articleId: item.articleId,
          quantity: item.quantity,
        },
      });
    }

    return order;
  }
}
