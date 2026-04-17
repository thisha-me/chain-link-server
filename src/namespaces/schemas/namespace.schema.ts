import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { randomUUID } from 'crypto';

export type NamespaceDocument = Namespace & Document;

@Schema({ timestamps: true })
export class Namespace {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: randomUUID, unique: true })
  uuid: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const NamespaceSchema = SchemaFactory.createForClass(Namespace);
