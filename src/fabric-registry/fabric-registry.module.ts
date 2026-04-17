import { Module } from '@nestjs/common';
import { FabricModule } from '../fabric/fabric.module';
import { FabricRegistryController } from './controllers/fabric-registry.controller';
import { FabricRegistryService } from './services/fabric-registry.service';
import { ApiKeysModule } from '../api-keys/api-keys.module';

@Module({
  imports: [FabricModule, ApiKeysModule],
  controllers: [FabricRegistryController],
  providers: [FabricRegistryService],
})
export class FabricRegistryModule {}
