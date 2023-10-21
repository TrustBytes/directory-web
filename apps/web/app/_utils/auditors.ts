
import type { C4Auditor } from '../_types/auditor.ts'



const getC4Auditor = async (handle: string): Promise<C4Auditor> => {
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

	const data: C4Auditor[] = (JSON.parse(result)) 
	const c4Auditor: C4Auditor = data[0]

	if (c4Auditor === undefined) {
		return {} as C4Auditor
	}

	//@TODO: remove hard coded value
	const auditor: C4Auditor = {
		handle: c4Auditor.handle ,
		avatarURL: c4Auditor.avatarURL ,
		totalFindings: c4Auditor.totalFindings ,
		totalRewards: c4Auditor.totalRewards ,
		availableForHire: c4Auditor.availableForHire ,
		highRiskFindings: c4Auditor.highRiskFindings ,
		mediumRiskFindings: c4Auditor.mediumRiskFindings ,
		lowRiskFindings: c4Auditor.lowRiskFindings ,
		soloHighRiskFindings:c4Auditor.soloHighRiskFindings ,
		gasOptzFindings: c4Auditor.gasOptzFindings ,
	}

	return auditor
}

async function getManyC4Auditors(): Promise<C4Auditor[]> {
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


	const c4Auditors: C4Auditor[] = JSON.parse(result)

	let payload: C4Auditor[] = []

	 payload = (c4Auditors).map((a) => {
		const auditor: C4Auditor = {
			handle: a.handle,
			avatarURL: a.avatarURL,
			totalFindings: a.totalFindings,
			totalRewards: a.totalRewards, 
		}
		return auditor
	}) 

	//sort trust score
	payload = payload.sort((a, b) => b.totalFindings - a.totalFindings)




	// limit results to be sent
	 payload = payload.slice(0, 40)
	return payload

}


export { getC4Auditor, getManyC4Auditors }




