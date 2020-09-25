import { ApiProperty } from '@nestjs/swagger';
import { BankIDAuthPayloadDto } from './authPayload.dto';

export class BankIDSignPayloadDto extends BankIDAuthPayloadDto {
  @ApiProperty()
  userVisibleData: string;
  @ApiProperty({ required: false })
  userNonVisibleData?: string;
}
