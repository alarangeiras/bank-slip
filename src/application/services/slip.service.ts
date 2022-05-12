import { SlipEntity } from '@/domain/entities/slip.entity';
import { SlipAlreadyExists } from '@/domain/errors/slip-already-exists.error';
import { SlipNotFoundError } from '@/domain/errors/slip-not-found.error';
import { SlipRepository } from '@/domain/repositories/slip.repository';
import { SlipService } from '@/domain/services/slip.service';

export class SlipServiceImpl implements SlipService {
	constructor(private slipRepository: SlipRepository) {}
	async find(code: string): Promise<SlipEntity> {
		const result = await this.slipRepository.find(code);
		if (!result) {
			throw new SlipNotFoundError(code);
		}
		return result!;
	}
	async create(slip: SlipEntity): Promise<void> {
		const foundSlip = await this.slipRepository.find(slip.code);
		if (foundSlip) {
			throw new SlipAlreadyExists(slip.code);
		}

		await this.slipRepository.create(slip);
	}
}
