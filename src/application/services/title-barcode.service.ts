import { BarcodeService } from '@/domain/services/barcode.service';
import { validateDAC } from '@/utils/dac.util';

export class TitleBarCodeService implements BarcodeService {
    async evaluateBarcode(barcode: string): Promise<boolean> {
        try {
            const fields = this.splitFields(barcode);
            for (const field of fields) {
                const validationResult = validateDAC(field);
                if (!validationResult) {
                    throw new Error();
                }
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    private splitFields(barcode: string): string[] {
        const result = Array<string>();

        result.push(barcode.substring(0, 10));
        result.push(barcode.substring(10, 21));
        result.push(barcode.substring(21, 32));

        return result;
    }
}
