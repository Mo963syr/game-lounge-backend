
export class UpdateScreenDto {
  name?: string;
  type?: 'PS4' | 'PS5';
  hourlyPrice?: number;
  status?: 'available' | 'busy';
}