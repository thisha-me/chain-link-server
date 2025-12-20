import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ChainsConfigService } from './services';

@Module({
  imports: [NestConfigModule],
  providers: [ChainsConfigService],
  exports: [ChainsConfigService],
})
export class ConfigModule { }
