import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";

export class LookupController extends BaseController {
  public Id: string = "LookupController";

  GetCountries = async (req: SessionRequest, res: Response) => {
    try {
      //const session = req.session;
      const countries = ["Australia", "South Africa"];
      res.send(countries);

    } catch (error) {
      console.log("Error fetching user info: ", error);
      throw error;
    }
  }
}