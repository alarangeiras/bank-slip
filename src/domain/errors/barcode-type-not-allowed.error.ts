import { ApiError } from '@/domain/errors/api.error';

export class BarcodeTypeNotAllowedError extends ApiError {
  constructor(code: string) {
    super(400, {
      message: `the barcode ${code} does not belongs to any allowed types`,
    });
  }
}
