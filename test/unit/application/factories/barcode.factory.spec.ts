import { BarcodeFactory } from '@/application/factories/barcode.factory';
import { TitleBarCodeService } from '@/application/services/title-barcode.service';

describe(BarcodeFactory.name.toString(), () => {
    describe(BarcodeFactory.prototype.build.toString(), () => {
        it('should throw error if its not valid', async () => {
            const factory = new BarcodeFactory([new TitleBarCodeService()]);
            try {
                await factory.build('1234');
            } catch (error) {
                return;
            }

            throw Error('should not reach this point');
        });
    });
});
