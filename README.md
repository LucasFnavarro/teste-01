ENDPOINT: 
POST -> localhost:3333/orders/pack

Input
Exemplo de entrada: 
{
  "pedidos": [
    {
      "id": "pedido-1",
      "produtos": [
        { "id": "p1", "altura": 10, "largura": 10, "comprimento": 10 },
        { "id": "p2", "altura": 40, "largura": 30, "comprimento": 10 },
        { "id": "p3", "altura": 20, "largura": 20, "comprimento": 20 }
      ]
    },
    {
      "id": "pedido-2",
      "produtos": [
        { "id": "x1", "altura": 45, "largura": 78, "comprimento": 50 }
      ]
    }
  ]
}
