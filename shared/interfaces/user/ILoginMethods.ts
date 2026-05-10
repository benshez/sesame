export type ILoginMethods = {
  recipeId: string,
  recipeUserId: {
    recipeUserId: string
  },
  tenantIds: Array<string>,
  email: string,
  timeJoined: number,
  verified: boolean
}