import "dotenv/config";
import { JsonRpcProvider } from "ethers";

export const PROVIDER_URL = process.env.PROVIDER_URL as string;

export const ORACLE_ADDRESS = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";

export const PROVIDER = new JsonRpcProvider(PROVIDER_URL);

export const SCALE_FACTOR = BigInt(10) ** BigInt(18);
