import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { BaseRoute } from "../../../core/routing"
import { 
  RoleController, 
  RoleService, 
  IRoleService 
} from "../../../controllers/v1";

class RoleRoutes extends BaseRoute<RoleController> {
  public baseUri = "v1/role";

  constructor() {
    const service: IRoleService = new RoleService();
    super(new RoleController(service));
  }

  protected RegisterRoutes(): void {
    this
      .router
      .get("/get-active-roles", verifySession(), async (req, res, next) => {
        return await this.controller.GetRoles(req, res, next);
      });

    this
      .router
      .delete("/delete-role/:roleId", verifySession(), async (req, res, next) => {
        return await this.controller.DeleteRole(req, res, next);
      });

    this
      .router
      .post("/create-new-role-or-add-permissions", verifySession(), async (req, res, next) => {
        return await this.controller.CreateNewRoleOrAddPermissions(req, res, next);
      });

    this
      .router
      .post("/remove-permissions-from-role", verifySession(), async (req, res, next) => {
        return await this.controller.RemovePermissionsFromRole(req, res, next);
      })

    this
      .router
      .get("/get-permissions-for-role/:roleId", verifySession(), async (req, res, next) => {
        return await this.controller.GetPermissionsForRole(req, res, next);
      })    

    this
      .router
      .get("/get-roles-that-have-permission", verifySession(), async (req, res, next) => {
        return await this.controller.GetRolesThatHavePermission(req, res, next);
      })    
      
    this
      .router
      .patch("/add-role-to-user", verifySession(), async (req, res, next) => {
        return await this.controller.AddRoleToUser(req, res, next);
      })    
      
    this
      .router
      .delete("/remove-role-from-user", verifySession(), async (req, res, next) => {
        return await this.controller.RemoveUserRole(req, res, next);
      })       
  }
}

export default RoleRoutes;