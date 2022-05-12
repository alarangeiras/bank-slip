import { SlipValidatorAdapter } from '@/application/adapters/slip-validator.adapter';
import { SlipInput } from '@/application/dtos/slip.input';
import { Validator } from '@/application/ports/validator';

export const initSlipValidatorAdapter = (input: SlipInput): Validator => {
	return new SlipValidatorAdapter(input);
};
