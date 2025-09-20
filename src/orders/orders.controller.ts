import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from './orders.service';
import { Body, Controller, Post } from '@nestjs/common';
import { OrdersRequestDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Post('pack')
  @ApiOperation({ summary: 'Calcular caixas e alocar os produtos por pedidos' })
  packOrders(@Body() body: OrdersRequestDto) {
    return this.ordersService.packOrders(body);
  }
}
