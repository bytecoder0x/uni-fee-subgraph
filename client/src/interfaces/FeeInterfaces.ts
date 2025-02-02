export interface DailyTotalFee {
	id: string;
	totalFee0: number;
	totalFee1: number;
	firstSwapTimestamp: number;
}

export interface FormattedDailyTotalFee {
	date: string;
	totalFeeInUSD: number;
}

export interface TotalFeeInUSD {
	formattedDailyTotalFees: FormattedDailyTotalFee[];
	formattedTotalFeeInUSD: number;
}