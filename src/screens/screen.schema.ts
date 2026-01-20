import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

export type ScreenDocument = Screen & Document;

@Schema({ timestamps: true })
export class Screen {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['PS4', 'PS5'], required: true })
  type: string;

  @Prop({ required: true })
  hourlyPrice: number;

  @Prop({ default: 'available', enum: ['available', 'busy'] })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  storeId: Types.ObjectId;
}

export const ScreenSchema = SchemaFactory.createForClass(Screen);
