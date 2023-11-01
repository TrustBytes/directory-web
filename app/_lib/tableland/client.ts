import { Database } from "@tableland/sdk";

// Create a database connection; since there is no signer,
// table reads are possible but creates/writes are not
const db = new Database();
export default db
