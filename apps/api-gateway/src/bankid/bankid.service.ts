import { HttpService, Inject, Injectable } from '@nestjs/common';
import {
  BankIDAuthPayloadDto,
  BankIDAuthResponseDto,
  BankIDSignPayloadDto,
  BankIDCollectResponse,
  BankIDRawSignResponse,
  BankIDRawAuthResponse,
  BankIDSignResponseDto,
  CollectStatus,
  PendingCollectResponseDto,
  FailedCollectResponseDto,
  failedHandler,
  pendingHandler,
  BankIDCollectPayloadDto,
} from '@chronos/bankid';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

@Injectable()
export class BankidService {
  @Inject() private readonly httpService: HttpService;

  public async auth(
    payload: BankIDAuthPayloadDto
  ): Promise<BankIDAuthResponseDto> {
    return this.httpService
      .post<BankIDRawAuthResponse>(
        process.env.BANKID_URL + '/auth',
        payload,
        config
      )
      .toPromise()
      .then((response) => response.data)
      .then((result) => {
        const { qrStartSecret, qrStartToken, ...rest } = result;
        return rest;
      });
  }

  public async sign(
    payload: BankIDSignPayloadDto
  ): Promise<BankIDSignResponseDto> {
    return this.httpService
      .post<BankIDRawSignResponse>(
        process.env.BANKID_URL + '/sign',
        payload,
        config
      )
      .toPromise()
      .then((response) => response.data)
      .then((result) => {
        const { qrStartSecret, qrStartToken, ...rest } = result;
        return rest;
      });
  }

  public async collect(
    orderRef: string
  ): Promise<PendingCollectResponseDto | FailedCollectResponseDto> {
    const result = await this.httpService
      .post<BankIDCollectResponse>(
        process.env.BANKID_URL + '/collect',
        { orderRef },
        config
      )
      .toPromise();

    if (result.data.status === CollectStatus.pending)
      return pendingHandler(result.data);

    if (result.data.status === CollectStatus.failed)
      return failedHandler(result.data);

    // @TODO: The user auth is complete
  }

  public async cancel(orderRef: string) {
    return this.httpService
      .post<{}>(process.env.BANKID_URL + '/cancel', { orderRef }, config)
      .toPromise()
      .then((result) => result.data);
  }
}
