import type { IEvent } from "@/interfaces";
import { HttpClient, type HttpClientOptions } from "@/plugins";
import { configuration } from "@/utilities"
import type { IUser } from "../../../../shared/interfaces";

export class ApiClient extends HttpClient {

  constructor(url: string = "", header: {} = {}) {

    if (typeof header === "object" && Object.keys(header).length === 0 && url === "") {
      const options: HttpClientOptions = Object.assign(header, { ...configuration.GetApiHeaderConfiguration() as HttpClientOptions })

      super(
        options
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
      sendVerificationEmail: (email: { email: string, userId: string }) => this.post("/email/send-verification-email", email, this.getHeader("Authorization")),
      verifyEmail: (args: { tenantId: string, userId: string, recipeUserId: string }) => this.post("/email/verify-email", { ...args }, this.getHeader("Authorization")),
      unVerifyEmail: (user: { recipeUserId: string, email: string }) => this.post("/email/un-verify-email", { ...user }, this.getHeader("Authorization"))
    }
  }

  users = () => {
    return {
      userInfo: (userId: string) => this.get(`/users/get-user-info/${userId}`, this.getHeader("Authorization")),
      getUserMetadata: (userId: string) => this.get(`/users/get-user-metadata/${userId}`, this.getHeader("Authorization")),
      addRoleToUser: (role: { role: string }) => this.post("/users/users/add-role-to-user", role, this.getHeader("Authorization")),
      updateUserMetadata: (userInfo: {}) => this.post("/users/update-user-metadata", { userInfo }, this.getHeader("Authorization")),
      updateUserEmailAndPassword: (userInfo: {}) => this.post("/users/update-user-email-password", { userInfo }, this.getHeader("Authorization")),
      signUp: (user: IUser) => this.post("/users/sign-up", { user }, this.getHeader("Authorization")),
      signIn: (user: IUser) => this.post("/users/sign-in", { user }, this.getHeader("Authorization"))
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
      createTenenatAndUserEvent: (event: {}) => this.post("/event/create-tenant-user-event", { event }, this.getHeader("Authorization")),
      updateTenenatAndUserEvent: (event: {}) => this.post("/event/update-tenant-user-event", { event }, this.getHeader("Authorization")),
      deleteTenenatAndUserEvent: (event: {}) => this.patch("/event/delete-tenenat-user-event", { event }, this.getHeader("Authorization"))
    }
  }

  tenant = () => {
    return {
      getTenantUsers: (nextPaginationToken: string) => this.get(`/tenant/get-tenant-users/${nextPaginationToken}`, this.getHeader("Authorization"))
    }
  }
}