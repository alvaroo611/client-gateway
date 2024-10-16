import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE, envs } from './config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [ProductsModule,OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
