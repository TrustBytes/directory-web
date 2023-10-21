import type { TablelandAuditor } from "../../_types/auditor";
import db from "./client";

// Perform a read query, requesting `all` rows from the table

const AUDITOR_TABLE_NAME = "trustbytes_auditors_list_80001_7927";

//@TODO: double check for run time errors
async function getAllRegisteredAuditors(): Promise<TablelandAuditor[]> {
	const { results } = await db.prepare(`SELECT * FROM ${AUDITOR_TABLE_NAME};`).all();
	return results as TablelandAuditor[];
}

//@TODO: double check for run time errors & fix sql
async function getRegisteredAuditor(_address: string): Promise<TablelandAuditor> {
	// try {
		const { results } = await db.prepare(`SELECT * FROM ${AUDITOR_TABLE_NAME} WHERE address = X'${"07f093df2C3E4BA793dbb3877508B1B2b0BAE9F0"}';`).all();
		return results as unknown as TablelandAuditor;
	// } catch (e) {
	// 	console.error(e)
	// 	throw new Error(`Error getting auditor with address ${address}`);
	// }
}

export { getAllRegisteredAuditors, getRegisteredAuditor }
