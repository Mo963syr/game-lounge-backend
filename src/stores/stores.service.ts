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
    try {
      const createdStore = new this.storeModel(createStoreDto);
      return await createdStore.save();
    } catch (error) {
      // التعامل مع خطأ تكرار الاسم (Error 11000)
      if (error.code === 11000) {
        throw new BadRequestException(`اسم المتجر "${createStoreDto.name}" موجود مسبقاً`);
      }
      throw error;
    }
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