import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
