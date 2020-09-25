export const genBankidModule = `$ cd chronos/apps/api-gateway
$ nest g mo bankid
CREATE src/bankid/bankid.module.ts (83 bytes)
$ nest g s bankid
CREATE src/bankid/bankid.service.spec.ts (460 bytes)
CREATE src/bankid/bankid.service.ts (90 bytes)
UPDATE src/bankid/bankid.module.ts (163 bytes)
$ nest g co bankid
CREATE src/bankid/bankid.controller.spec.ts (492 bytes)
CREATE src/bankid/bankid.controller.ts (101 bytes)
UPDATE src/bankid/bankid.module.ts (254 bytes)`;

export const genBankidModuleCmd = `cd chronos/apps/api-gateway
nest g mo bankid`;

export const genBankidModuleSteps = {
  highlights: [[1, 1], [2, 2], [4, 4], [8, 8], []],
  messages: [
    { step: 0, message: 'First we go to the app' },
    { step: 1, message: 'We then generate the BankID module' },
    { step: 2, message: '...and a service' },
    { step: 3, message: '...Finally we round it off with a controller' },
    { step: 4, message: "Let's view our new module!" },
  ],
};

export const setupAgent = `import { Module, HttpModule } from '@nestjs/common';
import { Agent } from 'https';
import { readFileSync } from 'fs';
import { BankidService } from './bankid.service';
import { BankidController } from './bankid.controller';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new Agent({
        ca: readFileSync('./cert/bankid.cer'),
        pfx: readFileSync('./cert/bankid.p12'),
        passphrase: 'qwerty123',
      }),
    }),
  ],
  providers: [BankidService],
  controllers: [BankidController]
})
export class BankidModule {}
`;
export const setupAgentCmd = `imports: [
  HttpModule.register({
    httpsAgent: new Agent({
      ca: readFileSync('./cert/bankid.cer'),
      pfx: readFileSync('./cert/bankid.p12'),
      passphrase: 'qwerty123',
    }),
  }),
],`;

export const setupAgentSteps = [
  {
    step: 0,
    message: 'First we need to import the HttpModule and some core modules',
  },
  {
    step: 1,
    message: 'Then we setup the agent as a dependency to the BankID module',
  },
  { step: 2, message: 'The certificates and details are provided by BankID' },
];

export const setupService = `import { HttpService, Inject, Injectable } from '@nestjs/common';
import {
  BankIDAuthPayloadDto,
  BankIDAuthResponseDto,
  BankIDSignPayloadDto,
  BankIDCollectResponse,
  BankIDCollectPayload,
  BankIDRawSignResponse,
  BankIDRawAuthResponse,
  BankIDSignResponse,
  CollectStatus,
  PendingCollectReturn,
  FailedCollectReturn,
} from './bankid.interface';
import { failedHandler, pendingHandler } from './handlers/handlers';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

@Injectable()
export class BankidService {
  @Inject() private readonly httpService: HttpService;

  public async auth(payload: BankIDAuthPayloadDto): Promise<BankIDAuthResponseDto> {
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

  public async sign(payload: BankIDSignPayloadDto): Promise<BankIDSignResponse> {
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
    payload: BankIDCollectPayload
  ): Promise<PendingCollectReturn | FailedCollectReturn> {
    const result = await this.httpService
      .post<BankIDCollectResponse>(
        process.env.BANKID_URL + '/collect',
        payload,
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
}`;

export const setupServiceSteps = {
  highlights: [
    [25, 25],
    [27, 40],
    [17, 21],
    [32, 32],
    [68, 72],
  ],
  messages: [
    {
      step: 0,
      message:
        'We inject the HttpService, that nest provides, in to our service',
    },
    {
      step: 1,
      message:
        'Now we can setup our methods, and send requests with the agent we setup earlier',
    },
    {
      step: 2,
      message:
        'BankID is picky with the content header, so we set it explicitly',
    },
    {
      step: 3,
      message:
        'And we include it together with the payload when we call the request method',
    },
    {
      step: 4,
      message: 'Finally we create some handlers',
    },
  ],
};

export const setupHandlers = `import {
  BankIDCollectResponse,
  HintCode,
  FailedCollectReturn,
  CollectStatus,
  PendingCollectReturn,
} from '../bankid.interface';

export const failedHandler = (
  payload: BankIDCollectResponse,
): FailedCollectReturn => {
  const message: FailedCollectReturn = {
    status: CollectStatus.failed,
    messageId: '',
  };
  switch (payload.hintCode) {
    case HintCode.expiredTransaction:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa8',
      };

    case HintCode.certificateErr:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa16',
      };

    case HintCode.userCancel:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa6',
      };

    case HintCode.cancelled:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa3',
      };

    case HintCode.startFailed:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa17',
      };

    default:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa22',
      };
  }
};

export const pendingHandler = (
  payload: BankIDCollectResponse,
): PendingCollectReturn => {
  const message: PendingCollectReturn = {
    status: CollectStatus.pending,
    hintCode: payload.hintCode,
    messageId: '',
  };
  switch (payload.hintCode) {
    case HintCode.outstandingTransaction:
      return {
        ...message,
        messageId: 'rfa13',
      };

    case HintCode.noClient:
      return {
        ...message,
        messageId: 'rfa1',
      };

    case HintCode.started:
      return {
        ...message,
        messageId: 'rfa15',
      };

    case HintCode.userSign:
      return {
        ...message,
        messageId: 'rfa9',
      };

    default:
      return {
        ...message,
        messageId: 'rfa21',
      };
  }
};

`;

export const setupInterface = `// import { ApiProperty } from '@nestjs/swagger';

export enum CardReader {
  class1 = 'class1',
  class2 = 'class2',
}

export enum CollectStatus {
  pending = 'pending',
  failed = 'failed',
  complete = 'complete',
}

export enum HintCode {
  outstandingTransaction = 'outstandingTransaction',
  noClient = 'noClient',
  started = 'started',
  userSign = 'userSign',
  expiredTransaction = 'expiredTransaction',
  certificateErr = 'certificateErr',
  userCancel = 'userCancel',
  cancelled = 'cancelled',
  startFailed = 'startFailed',
}

type Requirement = {
  cardReader?: CardReader;
  certificatePolicies?: string[];
  issuerCn?: string;
  autoStartTokenRequired?: boolean;
  allowFingerprint?: boolean;
};

export class BankIDAuthPayloadDto {
  // @ApiProperty()
  personalNumber?: string;
  endUserIp?: string;
  requirement?: Requirement;
}

export class BankIDSignPayloadDto extends BankIDAuthPayloadDto {
  userVisibleData: string;
  userNonVisibleData?: string;
}

export interface BankIDRawAuthResponse {
  autoStartToken: string;
  orderRef: string;
  qrStartToken: string;
  qrStartSecret: string;
}

export class BankIDAuthResponseDto {
  autoStartToken: string;
  orderRef: string;
}

export interface BankIDRawSignResponse extends BankIDRawAuthResponse {}
export class BankIDSignResponse extends BankIDAuthResponseDto {}

export interface BankIDRawCompletionData {
  user: {
    personalNumber: string;
    name: string;
    givenName: string;
    surname: string;
  };
  device: {
    ipAddress: string;
  };
  cert: {
    notBefore: Date;
    notAfter: Date;
  };
  signature: string;
  ocspResponse: string;
}

export interface BankIDCollectPayload {
  orderRef: string;
}

export interface BankIDCollectResponse {
  orderRef: string;
  status: CollectStatus;
  hintCode?: HintCode;
  completionData?: BankIDRawCompletionData;
}

export interface CollectReturn {
  status: CollectStatus;
  messageId: string;
}

export interface PendingCollectReturn extends CollectReturn {
  hintCode: HintCode;
}
export interface FailedCollectReturn extends CollectReturn {}
export interface SuccessCollectReturn extends CollectReturn {
  token: string;
  refreshToken: string;
  userId: string;
}
`;

export const setupController = `import {
  Controller,
  Post,
  Inject,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import {
  BankIDAuthPayloadDto,
  BankIDAuthResponseDto,
  BankIDSignPayloadDto,
  BankIDCollectPayload,
  BankIDSignResponse,
} from './bankid.interface';
import { BankidService } from './bankid.service';

@Controller('bankid')
export class BankidController {
  @Inject() private readonly bankid: BankidService;

  @Post('auth')
  async auth(@Body() payload: BankIDAuthPayloadDto): Promise<BankIDAuthResponseDto> {
    return await this.bankid.auth({
      ...payload,
      endUserIp: '192.168.0.1',
    } as BankIDAuthPayloadDto);
  }

  @Post('sign')
  async sign(@Body() payload: BankIDSignPayloadDto): Promise<BankIDSignResponse> {
    return await this.bankid.sign({
      ...payload,
      endUserIp: '192.168.0.1',
    } as BankIDSignPayloadDto);
  }

  @Put('collect')
  async collect(@Body() payload: BankIDCollectPayload) {
    return this.bankid.collect(payload);
  }

  @Delete('cancel/:orderRef')
  async cancel(@Param('orderRef') orderRef: string) {
    return await this.bankid.cancel(orderRef);
  }
}`;

export const setupControllerSteps = {
  highlights: [
    [21, 21],
    [23, 29],
    [44, 47],
  ],
  messages: [
    {
      step: 0,
      message: 'We begin with injecting the BankidService',
    },
    {
      step: 1,
      message: 'Creating a REST method is easy in nest',
    },
    {
      step: 2,
      message:
        'Adding parameters to a method is as easy as defining a key and adding it as an attribute',
    },
  ],
};

export const setupSwagger = `/**
* This is not a production server yet!
* This is only a minimal backend to get started.
*/

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BankidModule } from './bankid/bankid.module';

async function bootstrap() {
 const app = await NestFactory.create(BankidModule);
 const options = new DocumentBuilder()
   .setTitle('BankID example')
   .setDescription('This is a demoservice for bankid')
   .setVersion('1.0')
   .build();
 const document = SwaggerModule.createDocument(app, options);
 SwaggerModule.setup('api', app, document);
 const port = process.env.PORT || 3333;
 await app.listen(port, () => {
   Logger.log('Listening at http://localhost:' + port + '/');
 });
}

bootstrap();`;

export const setupSwaggerSteps = {
  highlights: [
    [21, 21],
    [23, 29],
    [44, 47],
  ],
  messages: [
    {
      step: 0,
      message: 'We begin with injecting the BankidService',
    },
    {
      step: 1,
      message: 'Creating a REST method is easy in nest',
    },
    {
      step: 2,
      message:
        'Adding parameters to a method is as easy as defining a key and adding it as an attribute',
    },
  ],
};
