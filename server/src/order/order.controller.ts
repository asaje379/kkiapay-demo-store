import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ArticleWithQuantity,
  InitOrderPayload,
  OrderService,
} from './order.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Commandes')
export class OrderController {
  constructor(private service: OrderService) {}

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Post()
  @ApiBody({ type: [ArticleWithQuantity] })
  async initOrder(@Body() items: InitOrderPayload) {
    return await this.service.registerOrder(items);
  }
}
