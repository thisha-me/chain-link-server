import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import fabricConfig from '../config/fabric.config';
import { FabricGatewayService } from './services/fabric-gateway.service';

@Module({
  imports: [ConfigModule.forFeature(fabricConfig)],
  providers: [FabricGatewayService],
  exports: [FabricGatewayService],
})
export class FabricModule {}
