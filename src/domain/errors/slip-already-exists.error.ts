import { ApiError } from '@/domain/errors/api.error';

export class SlipAlreadyExists extends ApiError {
	constructor(code: string) {
		super(412, `the slip ${code} already exists`);
	}
}
