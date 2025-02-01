import { ORACLE_ADDRESS, PROVIDER } from "./config";
import { SCALE_FACTOR } from "./config";
import { ethers } from "ethers";
import { oracleAbi } from "./abis/oracleABI";

export const getEthPriceFromOracle = async (): Promise<bigint> => {
	const oracle = new ethers.Contract(ORACLE_ADDRESS, oracleAbi, PROVIDER);
	const ethPrice = await oracle.latestAnswer();
	const decimals = await oracle.decimals();

	const decimalsFactor = BigInt(10) ** decimals;
	const ethPriceFormatted = (BigInt(ethPrice) * SCALE_FACTOR) / decimalsFactor;

	return ethPriceFormatted;
}