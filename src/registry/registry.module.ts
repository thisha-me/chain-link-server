import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { BlockchainModule } from '../blockchain';
import { RegistryController } from './controllers';
import { RegistryService } from './services';

@Module({
  imports: [ConfigModule, BlockchainModule],
  controllers: [RegistryController],
  providers: [RegistryService],
  exports: [RegistryService],
})
export class RegistryModule { }
