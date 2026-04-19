import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";
import { useDatabase } from "../../../core/db/query/useDatabase";

const database = useDatabase();

export class EventController extends BaseController {
  public Id: string = "EventController";

  GetEvents = async (req: SessionRequest, res: Response) => {
    try {
      const events = await database.event(database.db).find().all();
      res.send(events);
    } catch (error) {
      console.log("Error fetching event info: ", error);
      throw error;
    }
  }
}