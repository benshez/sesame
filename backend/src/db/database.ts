import createConnectionPool, { sql } from "@databases/pg";
import { useBackendConfig } from "../config/useBackendConfig";

export { sql };

const config = useBackendConfig();
const db = createConnectionPool(config.GetSesameConnectionString());
export default db;