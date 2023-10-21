import type { TablelandAuditor } from "../../_types/auditor";
import db from "./client";

// Perform a read query, requesting `all` rows from the table

const AUDITOR_TABLE_NAME = "trustbytes_auditors_list_80001_7927";

//@TODO: double check for run time errors
async function getAllRegisteredAuditors(): Promise<TablelandAuditor[]> {
	const { body } = await fetch("https://testnets.tableland.network/api/v1/query?mode=objects&statement=select%20*%20from%20trustbytes_auditors_list_80001_7927", {
		next: { revalidate: 30 }
	})

	const decoder = new TextDecoder('utf-8')
	// const { results } = await db.prepare(`SELECT * FROM ${AUDITOR_TABLE_NAME};`).all();
	// console.log("tableland auditors: ", results)
	if (!body) {
		throw new Error("Error getting all auditors");
	}
	const reader = body.getReader()


	let result = ''

	for (; ;) {
		/* eslint-disable no-await-in-loop -- can use await in this use case of reading data streams */
		const { done, value } = await reader.read()
		if (done) {
			break;
		}
		result += decoder.decode(value)
	}

	const data: TablelandAuditor[] = (JSON.parse(result))

	return data
	// return body as TablelandAuditor[];
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
