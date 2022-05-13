import { ApiError } from '@/domain/errors/api.error';

export class ValidationError extends ApiError {
	constructor(errorMessages: string[]) {
		super(400, {
			validationErrors: errorMessages,
		});
	}
}
