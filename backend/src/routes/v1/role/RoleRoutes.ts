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
      .get("/get-active-roles", verifySession(), async (req, res) => {
        return await this.controller.GetRoles(req, res);
      });

    this
      .router
      .delete("/remove-role", verifySession(), async (req, res) => {
        return await this.controller.DeleteRole(req, res);
      });

    this
      .router
      .post("/create-new-role-or-add-permission", verifySession(), async (req, res) => {
        return await this.controller.CreateNewRoleOrAddPermissions(req, res);
      });

    this
      .router
      .patch("/remove-persmission-from-role", verifySession(), async (req, res) => {
        return await this.controller.RemovePermissionsFromRole(req, res);
      })

    this
      .router
      .get("/get-permissions-for-role", verifySession(), async (req, res) => {
        return await this.controller.GetPermissionsForRole(req, res);
      })    

    this
      .router
      .get("/get-roles-that-have-permission", verifySession(), async (req, res) => {
        return await this.controller.GetRolesThatHavePermission(req, res);
      })    
      
    this
      .router
      .patch("/add-role-to-user", verifySession(), async (req, res) => {
        return await this.controller.AddRoleToUser(req, res);
      })    
      
    this
      .router
      .delete("/remove-role-from-user", verifySession(), async (req, res) => {
        return await this.controller.RemoveUserRole(req, res);
      })       
  }
}

export default RoleRoutes;