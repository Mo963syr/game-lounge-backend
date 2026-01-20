import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  currency: string;
// src/stores/dto/create-store.dto.ts
export class CreateStoreDto {
  name: string;
  location?: string;
  logo: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
}
