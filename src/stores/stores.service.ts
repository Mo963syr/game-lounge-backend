import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store, StoreDocument } from './schemas/store.schema';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(@InjectModel(Store.name) private storeModel: Model<StoreDocument>) {}

  // 1. إنشاء متجر جديد
  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const newStore = new this.storeModel(createStoreDto);
    return newStore.save();
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

  // 2. عرض جميع المتاجر (غير المحذوفة فقط)
  async findAll(): Promise<Store[]> {
    return this.storeModel.find({ isDeleted: false }).exec();
  }

  // 3. عرض متجر واحد بالتفصيل
  async findOne(id: string): Promise<Store> {
    const store = await this.storeModel.findById(id);
    // نتأكد أن المتجر موجود وأنه لم يتم حذفه
    if (!store || store.isDeleted) {
      throw new NotFoundException('المتجر غير موجود');
    }
    return store;
  }

  // 4. تعديل بيانات المتجر
  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    try {
      const updatedStore = await this.storeModel.findByIdAndUpdate(
        id,
        updateStoreDto,
        { new: true } // لإرجاع البيانات بعد التعديل
      );

      if (!updatedStore || updatedStore.isDeleted) {
        throw new NotFoundException('المتجر غير موجود لتعديله');
      }
      return updatedStore;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('الاسم الجديد مستخدم بالفعل لمتجر آخر');
      }
      throw error;
    }
  }

  // 5. الحذف الناعم (Soft Delete) - كما طلبت في الملاحظة رقم 3
  async remove(id: string): Promise<any> {
    const deletedStore = await this.storeModel.findByIdAndUpdate(
      id,
      { 
        isDeleted: true,  // نضع علامة الحذف
        isActive: false   // نعطل المتجر لمنع العمليات الجديدة
      },
      { new: true }
    );

    if (!deletedStore) throw new NotFoundException('المتجر غير موجود');
    
    return { message: 'تم حذف المتجر بنجاح (نقل للأرشيف)' };
  }
}