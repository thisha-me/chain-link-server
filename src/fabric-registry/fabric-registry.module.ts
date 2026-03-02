import { Module } from '@nestjs/common';
import { FabricModule } from '../fabric/fabric.module';
import { FabricRegistryController } from './controllers/fabric-registry.controller';
import { FabricRegistryService } from './services/fabric-registry.service';

@Module({
  imports: [FabricModule],
  controllers: [FabricRegistryController],
  providers: [FabricRegistryService],
})
export class FabricRegistryModule {}
