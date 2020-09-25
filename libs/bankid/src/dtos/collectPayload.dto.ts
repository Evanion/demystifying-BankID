import { ApiProperty } from '@nestjs/swagger';

export class BankIDCollectPayloadDto {
  @ApiProperty()
  orderRef: string;
}
