export class UpdateTableDto {
  name?: string;
  hourlyPrice?: number;
  status?: 'available' | 'busy';
}
