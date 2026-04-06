import { HttpClient } from "@/plugins";

export class ApiClient extends HttpClient {

  constructor(baseURL: string) {
    super({
      baseURL,
      headers: {}
    });
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