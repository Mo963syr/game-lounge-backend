import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResourceType = 'SCREEN' | 'TABLE';
export type SessionStatus = 'ACTIVE' | 'ENDED' | 'CANCELED';

@Schema({ timestamps: true })
export class Session extends Document {
  @Prop({ required: true })
  storeId: string;

  @Prop({ required: true })
  resourceId: string;

  @Prop({ required: true, enum: ['SCREEN', 'TABLE'] })
  resourceType: ResourceType;

  @Prop({ required: true })
  userId: string; // الكاشير

  @Prop({ required: true })
  createdBy: string;

  @Prop()
  token: string;

  @Prop({ required: true })
  sessionTime: number; // minutes

  @Prop({ required: true })
  startedAt: Date;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop()
  endedAt?: Date;

  @Prop({ type: Object, required: true })
  pricingSnapshot: {
    hourlyPrice: number;
    currency: string;
  };

  @Prop({ enum: ['ACTIVE', 'ENDED', 'CANCELED'], default: 'ACTIVE' })
  status: SessionStatus;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
