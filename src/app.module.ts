import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { BlockchainModule } from './blockchain';
import { RegistryModule } from './registry';
import { FabricRegistryModule } from './fabric-registry/fabric-registry.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BlockchainModule,
    RegistryModule,
    FabricRegistryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
