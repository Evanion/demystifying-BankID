import { Module, HttpModule, MiddlewareConsumer } from '@nestjs/common';
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
  controllers: [BankidController],
})
export class BankidModule {}
