
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
	console.log('#getC4Auditor')
	const decoder = new TextDecoder("utf-8")
	const profilePageURL = `https://code4rena.com/@${handle}`
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
		gasOptzFindings: c4Auditor.gasOptz 
	}

	return auditor
}

const getManyC4Auditors: () => Promise<Auditor[]> = async () => {
	console.log('#getManyC4Auditors')
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

	const auditors: Auditor[] = (c4Auditors).map((a) => {
		const auditor: Auditor = {
			handle: a.handle,
			avatarURL: a.image,
			totalFindings: a.allFindings,
			totalRewards: a.rewardsTotal 
		}
		return auditor
	}) 
	console.log(auditors)
	const firstTenAuditors = auditors.slice(0, 40)
	return firstTenAuditors

}


export { getC4Auditor, getManyC4Auditors }




