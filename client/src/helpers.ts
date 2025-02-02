import { ORACLE_ADDRESS, PROVIDER, SCALE_FACTOR_FOR_USDC, V2_POOL_CONTRACT } from "./config";
import { SCALE_FACTOR } from "./config";
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