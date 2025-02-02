import chalk from "chalk";
import { ORACLE_ADDRESS, PROVIDER, SCALE_FACTOR_FOR_USDC, V2_POOL_CONTRACT } from "./config";
import { SCALE_FACTOR } from "./config";
import { DailyTotalFee, TotalFeeInUSD } from "./interfaces/FeeInterfaces";
import { ethers } from "ethers";
import { oracleAbi } from "./abis/oracleABI";
import { pairV2Abi } from "./abis/PairV2ABI";

export const getEthPriceFromOracle = async (): Promise<bigint> => {
	const oracle = new ethers.Contract(ORACLE_ADDRESS, oracleAbi, PROVIDER);
	const ethPrice = await oracle.latestAnswer();
	const decimals = await oracle.decimals();

	const decimalsFactor = BigInt(10) ** decimals;
	const ethPriceFormatted = (BigInt(ethPrice) * SCALE_FACTOR) / decimalsFactor;

	return ethPriceFormatted;
}

export const getTVL = async (ethPrice: bigint): Promise<number> => {
	const poolV2 = new ethers.Contract(V2_POOL_CONTRACT, pairV2Abi, PROVIDER);
	const reserves = await poolV2.getReserves();

	const ethReserveInUSD = (reserves[1] * ethPrice) / SCALE_FACTOR;
	const usdcReserveInUSD = (reserves[0] * SCALE_FACTOR_FOR_USDC);

	const TVL = Number(ethReserveInUSD + usdcReserveInUSD) / Number(SCALE_FACTOR);
	const formattedTVL = Number(TVL.toFixed(2));

	return formattedTVL;
}

export const getFormattedTotalFeeInUSD = (dailyTotalFees: DailyTotalFee[], ethPrice: bigint): TotalFeeInUSD => {
	let totalFeeInUSD = 0;

	const formattedDailyTotalFees = dailyTotalFees.map((dailyTotalFee: DailyTotalFee) => {
		const ethFeeInUSD = BigInt(dailyTotalFee.totalFee1) * ethPrice / SCALE_FACTOR;
		const usdcFee = BigInt(dailyTotalFee.totalFee0) * SCALE_FACTOR_FOR_USDC;
		
		const formattedDailyTotalFeeInUSD = (Number(ethFeeInUSD + usdcFee) / Number(SCALE_FACTOR)).toFixed(2);
		totalFeeInUSD += Number(formattedDailyTotalFeeInUSD);

		return {
			date: dailyTotalFee.id,
			totalFeeInUSD: Number(formattedDailyTotalFeeInUSD),
		};
	});

	const formattedTotalFeeInUSD = Number(totalFeeInUSD.toFixed(2));
	return {
		formattedDailyTotalFees,
		formattedTotalFeeInUSD
	};
}

export const getAPR = (totalFeeInUSD: number, TVL: number, days: number): number => {
	const APR = ((totalFeeInUSD / TVL) * 100) * (365 / days);
	const formattedAPR = Number(APR.toFixed(3));

	return formattedAPR;
}

export const log = {
	start: (message: string) => console.log(chalk.white(`------------------------------ ${message} ------------------------------`)),
	success: (msg: string) => console.log(chalk.green("✅ " + msg)),
	error: (msg: string) => console.log(chalk.red("❌ " + msg)),
	info: (msg: string) => console.log(chalk.blue("✍️  " + msg)),
	warning: (msg: string) => console.log(chalk.yellow("⚠️  " + msg)),
};