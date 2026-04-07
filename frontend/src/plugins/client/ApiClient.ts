import { HttpClient } from "@/plugins";

export class ApiClient extends HttpClient {

  constructor(baseURL: string) {
    super({
      baseURL,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  email = () => {
    return {
      sendVerificationEmail: (email: { email: string }) => this.post("/emails/send-verification-email", { ...email }, this.getHeader("Authorization")),
      verifyEmail: (args: { token: string, tenantId: string, userId: string }) => this.post("/emails/verify-email", { ...args }, this.getHeader("Authorization")),
      unVerifyEmail: (args: {userId: string}) => this.post("/emails/un-verify-email", { ...args }, this.getHeader("Authorization"))
    }
  }

  users = () => {
    return {
      userInfo: (userId: string) => this.get(`/users/get-user-info/${userId}`, this.getHeader("Authorization"))
    }
  }

  mapbox = () => {
    return {
      getDirections: (profile: string, coordinates: Array<Array<number>>) => this.get(`/mapbox/directions/${profile}/${coordinates[0]};${coordinates[1]}`)
    }
  }
}