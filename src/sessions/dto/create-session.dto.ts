import { ResourceType } from '../entities/sessions.schema';

export class CreateSessionDto {
  storeId: string;
  resourceId: string;
  resourceType: ResourceType;
  sessionTime: number;
}
