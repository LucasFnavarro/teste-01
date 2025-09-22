import { HttpException, HttpStatus } from '@nestjs/common';

// Tipos
export type Product = {
  id?: string;
  altura: number;
  largura: number;
  comprimento: number;
};

export type Box = {
  id: string;
  name: string;
  altura: number;
  largura: number;
  comprimento: number;
};

export type PackedBox = {
  caixa: string;
  caixaId: string;
  produtos: Product[];
};

// Aqui definimos as caixas que o Sr. Manoel tem em estoque
const BOXES: Box[] = [
  {
    id: 'Caixa 1',
    name: 'Caixa Pequena',
    altura: 30,
    largura: 40,
    comprimento: 80,
  }, // 30x40x80
  {
    id: 'Caixa 2',
    name: 'Caixa Média',
    altura: 50,
    largura: 50,
    comprimento: 40,
  }, // 50x50x40
  {
    id: 'Caixa 3',
    name: 'Caixa Grande',
    altura: 50,
    largura: 80,
    comprimento: 60,
  }, // 50x80x60
];

// Realizar calculo do volume (aqui é soma das dimensões, não multiplicação real)
function volume(a: { altura: number; largura: number; comprimento: number }) {
  return a.altura + a.largura + a.comprimento;
}

// Verifica se o produto cabe na caixa considerando todas as rotações possíveis do produto dentro da caixa
function fitsInBox(product: Product, box: Box): boolean {
  const p = [product.altura, product.largura, product.comprimento];
  const b = [box.altura, box.largura, box.comprimento];

  // Verifica todas as permutação possível das dimensões do produto
  const perms = [
    [p[0], p[1], p[2]],
    [p[0], p[2], p[1]],
    [p[1], p[0], p[2]],
    [p[1], p[2], p[0]],
    [p[2], p[0], p[1]],
    [p[2], p[1], p[0]],
  ];

  // Se em qualquer rotação couber, retorna true
  return perms.some(
    (perm) => perm[0] <= b[0] && perm[1] <= b[1] && perm[2] <= b[2],
  );
}

export function validateProductsFit(products: Product[]): PackedBox[] {
  if (!products || products.length === 0) return [];

  // Verificação para ver se todos os produtos cabem em pelo menos uma caixa das caixas que Sr. Manoel tem disponível.
  for (const product of products) {
    const can = BOXES.some((box) => fitsInBox(product, box));

    if (!can) {
      throw new HttpException(
        `
                Produto ${
                  product.id ?? '[sem-id]'
                } não cabe em nenhuma das caixas disponíveis.
            `,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  // Ordena os produtos por volume decrescente
  const sorted = [...products].sort((a, b) => volume(b) - volume(a));

  // Array para armazenar as caixas embaladas (Caixas que já possuí um produto dentro).
  const used: {
    type: Box;
    remainingVolume: number;
    products: Product[];
  }[] = [];

  for (const prod of sorted) {
    const prodVol = volume(prod);
    let placed = false;

    // Aqui vamos tentar colocar o produto em uma caixa já usada
    for (const ub of used) {
      if (prodVol <= ub.remainingVolume && fitsInBox(prod, ub.type)) {
        ub.products.push(prod);
        ub.remainingVolume -= prodVol;
        placed = true;
        break;
      }
    }

    if (!placed) {
      // Abrir uma nova caixa que suporte o tamanho do produto
      const suitable = [...BOXES]
        .filter((b) => fitsInBox(prod, b) && volume(b) >= prodVol)
        .sort((a, b) => volume(a) - volume(b))[0];

      if (!suitable) {
        // Se não achou por volume, encontre maior caixa disponível que encaixe dimensionalmente com o produto
        const fallback = BOXES.find((b) => fitsInBox(prod, b));
        if (!fallback) throw new Error('Não há caixa que comporte o produto.');
        used.push({
          type: fallback,
          remainingVolume: volume(fallback) - prodVol,
          products: [prod],
        });
      } else {
        used.push({
          type: suitable,
          remainingVolume: volume(suitable) - prodVol,
          products: [prod],
        });
      }
    }
  }

  const output: PackedBox[] = used.map((u) => ({
    caixa: u.type.name,
    caixaId: u.type.id,
    produtos: u.products,
  }));

  return output;
}
