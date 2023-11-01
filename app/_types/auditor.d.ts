interface C4Auditor {
	handle: string;
	image: string;
	allFindings: number;
	awardTotal: number;
	availableForHire?: boolean;
	highRisk?: number;
	medRisk?: number;
	lowRisk?: number;
	soloHigh?: number;
	gasOptz?: number;
}

interface TrustbytesAuditor{
	address: string;
	name: string;
	competencies: string[];
	bio: string;
	totalFindings: number;
	trustScore: number;
	avatarURL?: string;
	isRegistered?: boolean;
	pageID: string;
	C4ID?: string;
}

interface TablelandAuditor {
     address: string;
     auditorId: number;
     bio: string;
     bugsFound: number,
     competencies:string; 
     id: number;
     name: string;
}


const ALL_SPECIALITES = ['nft', 'dao', 'defi', 'wallet'] as const;
type Speciality = typeof ALL_SPECIALITES[number];

export type { C4Auditor, Speciality, TrustbytesAuditor, TablelandAuditor }
