import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true }) // يضيف تاريخ الإنشاء والتعديل تلقائياً
export class Store {
  @Prop({ required: true, unique: true }) // الاسم فريد ومطلوب
  name: string;

  @Prop()
  location: string;

  @Prop()
  storeLogo: string;

  @Prop({ default: 'SYP' }) // العملة الافتراضية
  currency: string;

  @Prop({ default: 0 }) // سعر الساعة الافتراضي
  defaultHourlyPrice: number;

  @Prop({ default: true }) // حالة المتجر: نشط أم لا
  isActive: boolean;

  @Prop({ default: false }) // للحذف الناعم (Soft Delete)
  isDeleted: boolean;
}

export const StoreSchema = SchemaFactory.createForClass(Store);