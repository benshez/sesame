import { IEvent } from "../../../../../shared/interfaces";

export interface IEventService {
  GetActiveItemsByTenantIdAndUserId(userId: string, tenantId: string): Promise<IEvent[]>;
}