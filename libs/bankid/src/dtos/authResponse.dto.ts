import { ApiProperty } from '@nestjs/swagger';
export class BankIDAuthResponseDto {
  @ApiProperty()
  autoStartToken: string;
  @ApiProperty()
  orderRef: string;
}
