import { BigInt } from "@graphprotocol/graph-ts";
import { Swap } from "../generated/schema";

export const getCurrentDay = (event: Swap): string => {
	const timestampInMs = event.blockTimestamp.times(BigInt.fromI32(1000));
	const date = new Date(timestampInMs.toU64());

	const dayStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
	const dayString = dayStart.toISOString().split("T")[0];
    
	return dayString;
}