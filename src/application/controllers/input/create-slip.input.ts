import { SlipEntity } from '@/domain/entities/slip.entity';
import { IsSlip } from '@/infra/custom-validators/is-slip.validator';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateSlipInput {
	@IsSlip()
	@IsString()
	code: string;

	@IsNumber()
	amount: number;

	@IsDate()
	expirationDate: Date;

	constructor(code: string, amount: number, expirationDate: Date) {
		this.code = code;
		this.amount = amount;
		this.expirationDate = expirationDate;
	}

	async toEntity(): Promise<SlipEntity> {
		return {
			code: this.code,
			amount: this.amount,
			expirationDate: this.expirationDate,
		};
	}

	static fromEntity(entity: SlipEntity): CreateSlipInput {
		return new CreateSlipInput(entity.code, entity.amount, entity.expirationDate);
	}

	static fromJSON(jsonString: string | null): CreateSlipInput {
		let expirationDate: Date;
		if (!jsonString) {
			//treat error
		}
		const object = JSON.parse(jsonString!);
		if (isNaN(object.amount)) {
			//treat error
		}
		try {
			expirationDate = new Date(Date.parse(object.expirationDate));
		} catch (error) {
			throw Error();
			//treat error
		}

		return new CreateSlipInput(object.code, parseFloat(object.amount), expirationDate);
	}
}
