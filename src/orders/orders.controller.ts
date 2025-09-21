import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from './orders.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrdersRequestDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('pack')
  @ApiOperation({ summary: 'Calcular caixas e alocar os produtos por pedidos' })
  @ApiBearerAuth()
  packOrders(@Body() body: OrdersRequestDto) {
    return this.ordersService.packOrders(body);
  }
}
