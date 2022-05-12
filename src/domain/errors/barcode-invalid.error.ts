import { ApiError } from '@/domain/errors/api.error';

export class BarcodeInvalidError extends ApiError {
	constructor() {
		super(400, 'The informed barcode is invalid');
	}
}
