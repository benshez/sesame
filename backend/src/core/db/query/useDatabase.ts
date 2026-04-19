import createConnectionPool, { sql } from "@databases/pg";
import tables from "@databases/pg-typed";
import DatabaseSchema from "../sesame_model_types";
import { useBackendConfig } from "../../../config/useBackendConfig";


export const useDatabase = () => {
  const config = useBackendConfig();
  const dsn = new URL(config.GetSesameConnectionString())
  const db = createConnectionPool(dsn.href);
  const { organization, event_type, venue, event } = tables<DatabaseSchema>({

    //databaseSchema: () => import("../sesame_model_types/schema.json"),
  });

  return {
    db,
    sql,
    organization,
    event_type,
    venue,
    event
  }
}