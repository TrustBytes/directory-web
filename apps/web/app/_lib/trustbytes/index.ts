import {  getManyC4Auditors } from "../../_utils/auditors";
import { getAllRegisteredAuditors } from "../tableland/read";
import type { TrustbytesAuditor, C4Auditor } from "../../_types/auditor";

async function getTrustbytesAuditors(): Promise<TrustbytesAuditor[]> {
	const c4Auditors = await getManyC4Auditors();
	const registeredAuditors = await getAllRegisteredAuditors();
	const trustbytesAuditors: TrustbytesAuditor[] = registeredAuditors.map((a) => {
		return {
			address: a.address,
			name: a.name,
			competencies: a.competencies.split(","),
			bio: a.bio,
			totalFindings: a.bugsFound,
			trustScore: a.bugsFound / 10,
			isRegistered: true,
			pageID: a.address,
			avatarURL: "",
			C4ID: "",
		}
	})

	c4Auditors.forEach((a: C4Auditor) => {
		const c4Profile = {
			address: "",
			name: a.handle,
			competencies: [],
			bio: "",
			totalFindings: a.allFindings,
			trustScore: a.allFindings / 10,
			//@TODO: match c4 profiles with tableland profiles, remove hardcoded isRegistered value
			isRegistered: false,
			avatarURL: a.image,
			pageID: `${a.handle}`,
			C4ID: a.handle,
		}
		trustbytesAuditors.push(c4Profile);
	})


	return trustbytesAuditors;
}

async function getTrustbytesAuditor(address: string): Promise<TrustbytesAuditor> {
	//@TODO: migrate to filter using SQL instead
	const auditors = await getTrustbytesAuditors();
	const trustbytesAuditor = auditors.find((a) => a.address === address);
	// const registeredAuditor = await getRegisteredAuditor(address);
	// console.log("registeredAuditor", registeredAuditor)
	// const trustbytesAuditor = {
	// 	...registeredAuditor,
	// 	totalFindings: registeredAuditor.bugsFound,
	// 	trustScore: registeredAuditor.bugsFound / 10,
	// 	isRegistered: true,
	// 	pageID: registeredAuditor.address,
	// 	bio: registeredAuditor.bio,
	// }
	
	if (!trustbytesAuditor) {
		return { } as TrustbytesAuditor;
	}
	return trustbytesAuditor;

	// if (params.C4ID) {
	// 	const C4Auditor = await getC4Auditor(params.C4ID);
	// 	trustbytesAuditor.totalFindings
	// }
	
	// return trustbytesAuditor;





}

export { getTrustbytesAuditors, getTrustbytesAuditor };
