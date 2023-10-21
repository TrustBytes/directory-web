
import type { Auditor } from '../_types/auditor.ts'

interface C4Auditor {
	handle: string;
	image: string;
	allFindings: number;
	rewardsTotal: number;
	availableForHire: boolean;
	highRisk: number;
	mediumRisk: number;
	lowRisk: number;
	soloHigh: number;
	gasOptz: number;
}


const getC4Auditor = async (handle: string): Promise<Auditor> => {
	const decoder = new TextDecoder("utf-8")
	const url = `https://code4rena.com/api/functions/leaderboard?handle=${handle}`
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json'
		}
	})

	if (!res.body) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}

	const reader = res.body.getReader()
	let result = ''

	for (;;) {
		/* eslint-disable no-await-in-loop -- can use await in this use case of reading data streams */
		const { done, value } = await reader.read()
		if (done) {
			break;
		}
		result += decoder.decode(value)
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- JSON.parse is safe
	const data: C4Auditor[] = (JSON.parse(result)) 
	const c4Auditor = data[0]

	//@TODO: remove hard coded value
	const auditor: Auditor = {
		handle: c4Auditor.handle ,
		avatarURL: c4Auditor.image ,
		totalFindings: c4Auditor.allFindings ,
		totalRewards: c4Auditor.rewardsTotal ,
		availableForHire: c4Auditor.availableForHire ,
		highRiskFindings: c4Auditor.highRisk ,
		mediumRiskFindings: c4Auditor.mediumRisk ,
		lowRiskFindings: c4Auditor.lowRisk ,
		soloHighRiskFindings:c4Auditor.soloHigh ,
		gasOptzFindings: c4Auditor.gasOptz ,
		specialities: ["defi", "nft"],
		trustScore: Number(c4Auditor.allFindings / 10) || 0 ,
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- JSON.parse is safe
	return auditor
}

async function getManyC4Auditors(_params: {specialities: string[], trustScore: string, count?
	: number}): Promise<Auditor[]> {
	const url = `https://code4rena.com/api/functions/leaderboard`
	const res = await fetch(url)

	if (!res.body) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}
		

	const reader = res.body.getReader()
	let result = ''
	const decoder = new TextDecoder("utf-8")

	for (;;) {
		const { done, value } = await reader.read()
		if (done) {
			break;
		}
		result += decoder.decode(value)
	}


	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- JSON.parse is safe
	const c4Auditors: C4Auditor[] = JSON.parse(result)

	let payload: Auditor[] = []

	 payload = (c4Auditors).map((a) => {
		const auditor: Auditor = {
			handle: a.handle,
			avatarURL: a.image,
			totalFindings: a.allFindings,
			totalRewards: a.rewardsTotal, 
			trustScore: Number(a.allFindings / 10) || 0 ,
			specialities: ["defi", "nft"],

		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- JSON.parse is safe
		return auditor
	}) 

	//sort trust score
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- JSON.parse is safe
	payload = payload.sort((a, b) => b.totalFindings - a.totalFindings)




	// limit results to be sent
	 payload = payload.slice(0, 40)
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- JSON.parse is safe
	return payload

}


export { getC4Auditor, getManyC4Auditors }




