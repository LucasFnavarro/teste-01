import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
  @ApiProperty({ required: false, example: 'sku-123' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  altura: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  largura: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  comprimento: number;
}

export class OrderDTO {
  @ApiProperty({ required: false, example: 'pedido-1' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ type: [ProductDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  produtos: ProductDto[];
}

export class OrdersRequestDto {
  @ApiProperty({ type: [OrderDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDTO)
  pedidos: OrderDTO[];
}
