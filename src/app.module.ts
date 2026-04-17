import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { BlockchainModule } from './blockchain';
import { RegistryModule } from './registry';
import { FabricRegistryModule } from './fabric-registry/fabric-registry.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { NamespacesModule } from './namespaces/namespaces.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    BlockchainModule,
    RegistryModule,
    FabricRegistryModule,
    AuthModule,
    ApiKeysModule,
    NamespacesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
