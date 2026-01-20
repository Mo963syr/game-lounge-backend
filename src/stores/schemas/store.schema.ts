import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true })
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true, min: 0 })
  defaultHourlyPrice: number;

  @Prop({ default: null })
  image: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
