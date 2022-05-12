import { SlipEntity } from '@/domain/entities/slip.entity';

export class SlipDto {
	constructor(public code: string, public amount: number, public expirationDate: Date) {}

	async validate(): Promise<void> {}
	async toEntity(): Promise<SlipEntity> {
		return {
			code: this.code,
			amount: this.amount,
			expirationDate: this.expirationDate,
		};
	}
	static fromEntity(entity: SlipEntity): SlipDto {
		return new SlipDto(entity.code, entity.amount, entity.expirationDate);
	}
	static fromJSON(jsonString: string | null): SlipDto {
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

		return new SlipDto(object.code, parseFloat(object.amount), expirationDate);
	}
}
