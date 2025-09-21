import { Injectable } from '@nestjs/common';
import { OrderDTO, OrdersRequestDto } from './dto/create-order.dto';
import { validateProductsFit } from './packing-algorithm';

@Injectable()
export class OrderService {
  packOrders(body: OrdersRequestDto) {
    const results = body.pedidos.map((pedido: OrderDTO, idx) => {
      const pedidoId = pedido.id ?? `pedido-${idx + 1}`;

      const produtos = pedido.produtos.map((p, i) => ({
        id: p.id ?? `${pedidoId}-produto-${i + 1}`,
        altura: p.altura,
        largura: p.largura,
        comprimento: p.comprimento,
      }));

      const caixas = validateProductsFit(produtos);

      return {
        pedido: pedidoId,
        caixas,
      };
    });

    return { resultados: results };
  }
}
