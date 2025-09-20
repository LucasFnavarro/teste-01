import { Injectable } from '@nestjs/common';
import { OrderDto, OrdersRequestDto } from './dto/create-order.dto';
import { packOrder } from './packing-algorithm';

@Injectable()
export class OrderService {
  packOrders(body: OrdersRequestDto) {
    const results = body.pedidos.map((pedido: OrderDto, idx) => {
      const pedidoId = pedido.id ?? `pedido-${idx + 1}`;

      const produtos = pedido.produtos.map((p, i) => ({
        id: p.id ?? `${pedidoId}-produto-${i + 1}`,
        altura: p.altura,
        largura: p.largura,
        comprimento: p.comprimento,
      }));

      const caixas = packOrder(produtos);

      return {
        pedido: pedidoId,
        caixas,
      };
    });

    return { resultados: results };
  }
}
