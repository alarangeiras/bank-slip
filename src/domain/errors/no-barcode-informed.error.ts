import { ApiError } from '@/domain/errors/api.error';

export class NoBarCodeInformedError extends ApiError {
	constructor() {
		super(400, 'No barcode informed');
	}
}
