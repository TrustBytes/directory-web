
import type { C4Auditor } from '../_types/auditor.ts'



const getC4Auditor = async (handle: string): Promise<C4Auditor> => {
	const decoder = new TextDecoder("utf-8")
	const url = `https://code4rena.com/api/functions/leaderboard?handle=${handle}`
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json'
		},
		next: {
			revalidate: 300 
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

	return c4Auditor
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


	let c4Auditors: C4Auditor[] = JSON.parse(result)


	//sort trust score
	c4Auditors = c4Auditors.sort((a, b) => b.allFindings - a.allFindings)




	// limit results to be sent
	 c4Auditors = c4Auditors.slice(0, 40)
	return c4Auditors

}


export { getC4Auditor, getManyC4Auditors }




