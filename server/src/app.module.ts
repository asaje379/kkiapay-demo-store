import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { PrismaModule } from './prisma/prisma.module';
import { VendorModule } from './vendor/vendor.module';
import { OrderModule } from './order/order.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ArticleModule,
    PrismaModule,
    VendorModule,
    OrderModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
