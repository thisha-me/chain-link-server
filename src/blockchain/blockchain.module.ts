import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from '../config';
import { ProviderService, SignerService, ContractService } from './services';

@Module({
  imports: [NestConfigModule, ConfigModule],
  providers: [ProviderService, SignerService, ContractService],
  exports: [ProviderService, SignerService, ContractService],
})
export class BlockchainModule {}
