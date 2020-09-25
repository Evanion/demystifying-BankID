import {
  Controller,
  Post,
  Inject,
  Body,
  Put,
  Delete,
  Param,
  Ip,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
  BankIDAuthPayloadDto,
  BankIDAuthResponseDto,
  BankIDCollectPayloadDto,
  BankIDSignPayloadDto,
  BankIDSignResponseDto,
  PendingCollectResponseDto,
} from '@chronos/bankid';
import { BankidService } from './bankid.service';

@Controller('bankid')
export class BankidController {
  @Inject() private readonly bankid: BankidService;

  @Post('auth')
  @ApiResponse({ type: BankIDAuthResponseDto, status: 201 })
  async auth(
    @Body() payload: BankIDAuthPayloadDto,
    @Ip() endUserIp: string
  ): Promise<BankIDAuthResponseDto> {
    return await this.bankid.auth({
      ...payload,
      endUserIp,
    } as BankIDAuthPayloadDto);
  }

  @Post('sign')
  @ApiResponse({ type: BankIDSignResponseDto, status: 201 })
  async sign(
    @Body() payload: BankIDSignPayloadDto,
    @Ip() endUserIp: string
  ): Promise<BankIDSignResponseDto> {
    return await this.bankid.sign({
      ...payload,
      endUserIp,
    } as BankIDSignPayloadDto);
  }

  @Put('collect/:orderRef')
  @ApiResponse({ type: PendingCollectResponseDto, status: 200 })
  async collect(@Param('orderRef') orderRef: string) {
    return this.bankid.collect(orderRef);
  }

  @Delete('cancel/:orderRef')
  @ApiOkResponse({
    status: 200,
    description: 'The specified orderRef process have been cancelled',
  })
  async cancel(@Param('orderRef') orderRef: string) {
    return await this.bankid.cancel(orderRef);
  }
}
