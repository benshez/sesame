import { IEvent } from "../../../../../shared/interfaces";
import { useDatabase } from "../../../core/db/query/useDatabase";
import { EventResponse } from "./EventResponse";
import { IEventService } from "./IEventService";

export class EventService implements IEventService {
  
  private database = useDatabase();

  async GetActiveItemsByTenantIdAndUserId(userId: string, tenantId: string): Promise<IEvent[]> {

    const events = await this.database
      .event(this.database.db)
      .find(
        {
          tenant_id: tenantId,
          user_id: userId,
          active: true
        })
      .all();

    return EventResponse.CreateResponse(events) as unknown as IEvent[];
  }

  // DeleteData(...args: unknown[]): unknown {
  //   throw new Error("Method not implemented");
  // }

  // UpdateData(...args: unknown[]): unknown {
  //   throw new Error("Method not implemented");
  // }
}