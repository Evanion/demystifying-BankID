import { ApiProperty } from '@nestjs/swagger';
import { CollectStatus, HintCode } from '../types';

export class CollectResponseDto {
  @ApiProperty()
  status: CollectStatus;
  @ApiProperty()
  messageId: string;
}

export class PendingCollectResponseDto extends CollectResponseDto {
  @ApiProperty()
  hintCode: HintCode;
}
export class FailedCollectResponseDto extends CollectResponseDto {}
export class SuccessCollectResponseDto extends CollectResponseDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  userId: string;
}
