import { BarcodeFactory } from '@/application/factories/barcode.factory';
import { AgreementBarcodeService } from '@/application/services/agreement-barcode.service';
import { TitleBarCodeService } from '@/application/services/title-barcode.service';
import { BarcodeService } from '@/domain/services/barcode.service';

export const initBarCodeFactory = (): BarcodeFactory => {
    const allowedBarcodeTypes: BarcodeService[] = [
        new TitleBarCodeService(),
        new AgreementBarcodeService(),
    ];
    return new BarcodeFactory(allowedBarcodeTypes);
};
