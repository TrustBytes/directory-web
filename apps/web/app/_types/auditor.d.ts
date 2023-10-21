interface Auditor {
	handle: string;
	avatarURL: string;
	totalFindings: number;
	totalRewards: number;
	availableForHire?: boolean;
	highRiskFindings?: number;
	mediumRiskFindings?: number;
	lowRiskFindings?: number;
	soloHighRiskFindings?: number;
	gasOptzFindings?: number;
	specialities: string[];
	trustScore: number;

}


const ALL_SPECIALITES = ['nft', 'dao', 'defi', 'wallet'] as const;
type Speciality = typeof ALL_SPECIALITES[number];

export type { Auditor, Speciality }
