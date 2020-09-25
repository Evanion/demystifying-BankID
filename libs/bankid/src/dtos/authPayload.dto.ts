import { ApiProperty } from '@nestjs/swagger';
import { Requirement } from '../types';

export class BankIDAuthPayloadDto {
  @ApiProperty({ required: false })
  personalNumber?: string;
  endUserIp?: string;
  requirement?: Requirement;
}
