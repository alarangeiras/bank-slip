import { CreateSlipInput } from '@/application/controllers/input/create-slip.input';
import { FindSlipInput } from '@/application/controllers/input/find-slip.input';
import { SlipOutput } from '@/application/controllers/output/slip.output';
import { Validator } from '@/application/ports/validator.port';
import { SlipService } from '@/domain/services/slip.service';

export class SlipController {
  constructor(private slipService: SlipService, private validator: Validator) {}

  async find(slipInput: FindSlipInput): Promise<SlipOutput> {
    await this.validator.validate(slipInput);
    return await this.slipService.find(slipInput.code!);
  }

  async create(slipInput: CreateSlipInput): Promise<SlipOutput> {
    await this.validator.validate(slipInput);
    const entity = await slipInput.toEntity();
    await this.slipService.create(entity);
    return slipInput;
  }
}
