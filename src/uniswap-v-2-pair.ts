import { BigInt } from "@graphprotocol/graph-ts";
import { Swap as SwapEvent } from "../generated/UniswapV2Pair/UniswapV2Pair";
import { Swap } from "../generated/schema";
import { DailyTotalFee } from "./daily-fee-schema";
import { getCurrentDay } from "./get-date";

export function handleSwap(event: SwapEvent): void {
	let entity = new Swap(event.transaction.hash.concatI32(event.logIndex.toI32()));

	entity.sender = event.params.sender;
	entity.amount0In = event.params.amount0In;
	entity.amount1In = event.params.amount1In;
	entity.amount0Out = event.params.amount0Out;
	entity.amount1Out = event.params.amount1Out;
	entity.to = event.params.to;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();

	const dayString = getCurrentDay(entity);

	let dailyTotalFee = DailyTotalFee.load(dayString);
  
	if (dailyTotalFee == null) {
		dailyTotalFee = new DailyTotalFee(dayString);
	}

	const tokenInIs0 = event.params.amount0In.gt(BigInt.fromI32(0));

	const amountIn = tokenInIs0 ? event.params.amount0In : event.params.amount1In;
	const fee = amountIn.times(BigInt.fromString("3")).div(BigInt.fromString("1000"));
  
	if (tokenInIs0) {
		dailyTotalFee.totalFee0 = dailyTotalFee.totalFee0.plus(fee);
	} else {
		dailyTotalFee.totalFee1 = dailyTotalFee.totalFee1.plus(fee);
	}

	dailyTotalFee.save();
}