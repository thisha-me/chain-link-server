import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { BlockchainModule } from './blockchain';
import { RegistryModule } from './registry';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BlockchainModule,
    RegistryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
