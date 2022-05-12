import { SlipDto } from '@/application/dto/slip.dto';
import { SlipService } from '@/domain/services/slip.service';

export class SlipController {
	constructor(private slipService: SlipService) {}

	async find(code: string | undefined): Promise<SlipDto> {
		return SlipDto.fromEntity(await this.slipService.find(code!));
	}

	async create(slipInput: SlipDto): Promise<SlipDto> {
		await slipInput.validate();
		const entity = await slipInput.toEntity();
		await this.slipService.create(entity);
		return slipInput;
	}
}
