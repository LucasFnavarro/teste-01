import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'lojinha-du-manoel' })
  @IsString()
  username: string;

  @ApiProperty({ example: '123456', required: false })
  @IsString()
  password?: string;
}
