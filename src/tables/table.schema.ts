import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TableDocument = Table & Document;

@Schema({ timestamps: true })
export class Table {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  hourlyPrice: number;

  @Prop({
    enum: ['available', 'busy'],
    default: 'available',
  })
  status: string;

  @Prop({ required: true })
  storeId: string;
}

export const TableSchema = SchemaFactory.createForClass(Table);
