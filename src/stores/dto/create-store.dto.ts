import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  name: string;
  location: string;
  currency?: string;          // اختياري
  defaultHourlyPrice?: number;// اختياري
  storeLogo?: string;         // اختياري
}