import { HttpClient } from "@/plugins";

export class ApiClient extends HttpClient {

  constructor() {
    const apiPort = import.meta.env.VUE_APP_API_PORT || 3001;
    const apiDomain: string = import.meta.env.VUE_APP_API_URL || `http://localhost:${apiPort}/api/v1`;

    super({
      baseURL: apiDomain,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
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
      countries: () => this.get("/lookup/get-countries", this.getHeader("Authorization"))
    }
  }

  events = () => {
    return {
      getEvents: () => this.get("/event/get-events", this.getHeader("Authorization"))
    }
  }
}