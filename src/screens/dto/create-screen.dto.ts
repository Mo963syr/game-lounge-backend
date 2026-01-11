export class CreateScreenDto {
  name: string;
  type: 'PS4' | 'PS5';
  hourlyPrice: number;
  storeId: string;
}

