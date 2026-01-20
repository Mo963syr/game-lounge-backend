import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store, StoreDocument } from './schemas/store.schema';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoresService {
  constructor(@InjectModel(Store.name) private storeModel: Model<StoreDocument>) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const newStore = new this.storeModel(createStoreDto);
    return newStore.save();
  }
}
