// src/stores/stores.service.ts
import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<Store>,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateStoreDto) {
     const existstore=await this.storeModel.findOne({name:dto.name.trim()});
     if (existstore) {
    throw new BadRequestException('Store name already exists');
  }
    const store = await this.storeModel.create({
      name: dto.name,
      location: dto.location,
      logo: dto.logo,
    });

    const adminUser = await this.usersService.create({
      name: dto.adminName,
      email: dto.adminEmail,
      password: dto.adminPassword,
      role: 'ADMIN',
      // storeId: store._id.toString(),
    });

   
    store.ownerUserId = adminUser._id;
    await store.save();

    return {
      store,
      adminUser: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
      },
    };
  }
}
