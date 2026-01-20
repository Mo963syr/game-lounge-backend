// src/stores/schemas/store.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop()
  location: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  ownerUserId: Types.ObjectId;

  @Prop({ required: false })
  logo: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
