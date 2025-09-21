import { describe, expect, it } from 'vitest';
import { packOrder } from '../packing-algorithm';

describe('Módulo de embalagem', () => {
  it('Deve embalar os itens corretamente', async () => {
    const produtos = [
      { id: 'p1', altura: 10, largura: 10, comprimento: 10 },
      { id: 'p2', altura: 10, largura: 10, comprimento: 10 },
      { id: 'p3', altura: 10, largura: 10, comprimento: 10 },
    ];

    const resultado = packOrder(produtos);

    expect(resultado.length).toBeGreaterThan(0);

    const totalPacked = resultado.reduce(
      (acc, box) => acc + box.produtos.length,
      0,
    );
    expect(totalPacked).toBe(3);
  });
});
