import { Entity, BigDecimal, BigInt, Value, store, ValueKind } from "@graphprotocol/graph-ts";

export class DailyTotalFee extends Entity {
	constructor(id: string) {
		super();
		this.set("id", Value.fromString(id));
		this.set("totalFee0", Value.fromBigInt(BigInt.fromI32(0)));
		this.set("totalFee1", Value.fromBigInt(BigInt.fromI32(0)));
	}

	save(): void {
		let id = this.get("id");
		assert(id != null, "Cannot save DailyTotalFee entity without an ID");
		if (id) {
			assert(
				id.kind == ValueKind.STRING,
				`Entities of type DailyTotalFee must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
			);
			store.set("DailyTotalFee", id.toString(), this);
		}
	}

	static load(id: string): DailyTotalFee | null {
		return changetype<DailyTotalFee | null>(store.get("DailyTotalFee", id));
	}

	set id(value: string) {
		this.set("id", Value.fromString(value));
	}

	set totalFee0(fee: BigInt) {
		this.set("totalFee0", Value.fromBigInt(fee));
	}

	set totalFee1(fee: BigInt) {
		this.set("totalFee1", Value.fromBigInt(fee));
	}

	set firstSwapTimestamp(value: BigInt) {
		this.set("firstSwapTimestamp", Value.fromBigInt(value));
	}

	get totalFee0(): BigInt {
		let value = this.get("totalFee0");
		if (!value || value.kind == ValueKind.NULL) {
			throw new Error("Cannot return null for a required field.");
		} else {
			return value.toBigInt();
		}
	}

	get totalFee1(): BigInt {
		let value = this.get("totalFee1");
		if (!value || value.kind == ValueKind.NULL) {
			throw new Error("Cannot return null for a required field.");
		} else {
			return value.toBigInt();
		}
	}

	get firstSwapTimestamp(): BigInt {
		let value = this.get("firstSwapTimestamp");
		if (!value || value.kind == ValueKind.NULL) {
			throw new Error("Cannot return null for a required field.");
		} else {
			return value.toBigInt();
		}
	}
}
