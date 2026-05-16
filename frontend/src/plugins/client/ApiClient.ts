import type { IConfig, IEvent } from "@/interfaces";
import { HttpClient } from "@/plugins";
import { configuration } from "@/utilities"

export class ApiClient extends HttpClient {

  constructor(url: string = "", header: {} = {}) {
    const config: IConfig = configuration.GetApiHeaderConfiguration() as IConfig;


    if (typeof header === "object" && Object.keys(header).length === 0 && url === "") {
      header = configuration.GetApiHeaderConfiguration()
      super(
        /*@ts-ignore */
        header
      );
    } else {
      super({
        baseURL: url,
        timeout: 20000,
        headers: header
      });
    }
  }

  session = () => {
    return {
      sessionInfo: () => this.get("/session/info", this.getHeader("Authorization"))
    }
  }

  email = () => {
    return {
      sendVerificationEmail: (email: { email: string }) => this.post("/emails/send-verification-email", { ...email }, this.getHeader("Authorization")),
      verifyEmail: (args: { token: string, tenantId: string, userId: string }) => this.post("/emails/verify-email", { ...args }, this.getHeader("Authorization")),
      unVerifyEmail: (args: { userId: string }) => this.post("/emails/un-verify-email", { ...args }, this.getHeader("Authorization"))
    }
  }

  users = () => {
    return {
      userInfo: (userId: string) => this.get(`/users/get-user-info/${userId}`, this.getHeader("Authorization")),
      getUserMetadata: (userId: string) => this.get(`/users/get-user-metadata/${userId}`, this.getHeader("Authorization")),
      addRoleToUser: (role: { role: string }) => this.post("/users/users/add-role-to-user", role, this.getHeader("Authorization")),
      updateUserMetadata: (userInfo: {}) => this.post("/users/update-user-metadata", { userInfo }, this.getHeader("Authorization")),
      updateUserEmailAndPassword: (userInfo: {}) => this.post("/users/update-user-email-password", { userInfo }, this.getHeader("Authorization")),
    }
  }

  mapbox = () => {
    return {
      getDirections: (profile: string, coordinates: Array<Array<number>>) => this.get(`/mapbox/directions/${profile}/${coordinates[0]};${coordinates[1]}`)
    }
  }

  lookup = () => {
    return {
      countries: () => this.get("/lookup/get-countries", this.getHeader("Authorization")),
      eventTypes: () => this.get("/lookup/get-event-types", this.getHeader("Authorization")),
      venues: () => this.get("/lookup/gget-venues", this.getHeader("Authorization")),
      organizations: () => this.get("/lookup/get-organizations", this.getHeader("Authorization")),
      eventStatuses: () => this.get("/lookup/get-statuses", this.getHeader("Authorization")),
    }
  }

  events = () => {
    return {
      getActiveEventsByTenantIdAndUserId: () => this.get(`/event/get-active-user-events`, this.getHeader("Authorization")),
      createTenenatAndUserEvent: (eventInfo: IEvent) => this.post("/event/create-tenant-user-event", { eventInfo }, this.getHeader("Authorization")),
      updateTenenatAndUserEvent: (eventInfo: IEvent) => this.post("/event/update-tenant-user-event", { eventInfo }, this.getHeader("Authorization")),
      deleteTenenatAndUserEvent: (eventId: string) => this.patch("/event/delete-tenenat-user-event", { eventId }, this.getHeader("Authorization"))
    }
  }
}