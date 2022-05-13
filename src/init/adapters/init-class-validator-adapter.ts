import { Validator } from '@/application/ports/validator.port';
import { ClassValidatorAdapter } from '@/infra/adapters/class-validator.adapter';

export const initClassValidatorAdapter = (): Validator => {
	return new ClassValidatorAdapter();
};
