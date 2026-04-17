import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NamespacesService } from './namespaces.service';
import { NamespacesController } from './namespaces.controller';
import { Namespace, NamespaceSchema } from './schemas/namespace.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Namespace.name, schema: NamespaceSchema }]),
  ],
  controllers: [NamespacesController],
  providers: [NamespacesService],
  exports: [NamespacesService],
})
export class NamespacesModule {}
