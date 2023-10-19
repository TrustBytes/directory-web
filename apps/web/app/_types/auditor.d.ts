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
}

export type { Auditor }
