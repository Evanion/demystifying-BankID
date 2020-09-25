import { Module } from '@nestjs/common';
import { BankidModule } from '../bankid/bankid.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BankidModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
