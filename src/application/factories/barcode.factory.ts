import { BarcodeTypeNotAllowedError } from '@/domain/errors/barcode-type-not-allowed.error';
import { BarcodeService } from '@/domain/services/barcode.service';

export class BarcodeFactory {
    constructor(private barcodeServices: BarcodeService[]) {}

    async build(barcode: string): Promise<BarcodeService> {
        for (const service of this.barcodeServices) {
            if (await service.evaluateBarcode(barcode)) {
                return service;
            }
        }
        throw new BarcodeTypeNotAllowedError(barcode);
    }
}
