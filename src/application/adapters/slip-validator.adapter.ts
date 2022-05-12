import { SlipInput } from '@/application/dtos/slip.input';
import { Validator } from '@/application/ports/validator';
import { BarcodeInvalidError } from '@/domain/errors/barcode-invalid.error';
import { NoBarCodeInformedError } from '@/domain/errors/no-barcode-informed.error';

export class SlipValidatorAdapter implements Validator {
	constructor(private input: SlipInput) {}

	async validate(): Promise<void> {
		if (this.input.barCodeContent === undefined) {
			throw new NoBarCodeInformedError();
		}
		if (this.input.barCodeContent.length !== 44) {
			throw new BarcodeInvalidError();
		}
	}
}
