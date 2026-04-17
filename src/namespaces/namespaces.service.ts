import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Namespace, NamespaceDocument } from './schemas/namespace.schema';
import { CreateNamespaceDto } from './dto/namespace.dto';

@Injectable()
export class NamespacesService {
  constructor(
    @InjectModel(Namespace.name) private namespaceModel: Model<NamespaceDocument>,
  ) {}

  async create(userId: string, createDto: CreateNamespaceDto) {
    const existing = await this.namespaceModel.findOne({ name: createDto.name });
    if (existing) {
      throw new ConflictException(`Namespace '${createDto.name}' is already taken.`);
    }

    const namespace = new this.namespaceModel({
      name: createDto.name,
      user: new Types.ObjectId(userId),
    });

    await namespace.save();
    return namespace;
  }

  async findByUser(userId: string) {
    return this.namespaceModel.find({ user: new Types.ObjectId(userId) }).exec();
  }

  async verifyOwnership(userId: string, name: string): Promise<boolean> {
    const namespace = await this.namespaceModel.findOne({ name, user: new Types.ObjectId(userId) });
    return !!namespace;
  }
}
