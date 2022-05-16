import { BarcodeService } from '@/domain/services/barcode.service';
import { validateDAC } from '@/utils/dac.util';

export class AgreementBarcodeService implements BarcodeService {
    async evaluateBarcode(barcode: string): Promise<boolean> {
        const fields = this.splitFields(barcode);
        for (const field of fields) {
            const validationResult = validateDAC(field);
            if (!validationResult) {
                return false;
            }
        }
        return true;
    }

    splitFields(barcode: string) {
        const result: string[] = [];
        result.push(barcode.substring(0, 12));
        result.push(barcode.substring(12, 24));
        result.push(barcode.substring(24, 36));
        result.push(barcode.substring(36, 48));
        return result;
    }
}
