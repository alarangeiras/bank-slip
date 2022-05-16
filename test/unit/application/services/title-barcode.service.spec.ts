import { TitleBarCodeService } from '@/application/services/title-barcode.service';

describe(TitleBarCodeService.name.toString(), () => {
  describe(TitleBarCodeService.prototype.evaluateBarcode.name, () => {
    let titleBarCodeService: TitleBarCodeService;
    beforeEach(() => {
      titleBarCodeService = new TitleBarCodeService();
    });
    test('should validate a correct barcode', async () => {
      const barCodeSequence = '00190500954014481606906809350314337370000000100';
      const result = await titleBarCodeService.evaluateBarcode(barCodeSequence);
      expect(result).toBeTruthy();
    });
    test('should validate a incorrect barcode', async () => {
      const barCodeSequence = '00190500964014481606906809350314337370000000100';
      const result = await titleBarCodeService.evaluateBarcode(barCodeSequence);
      expect(result).toBeFalsy();
    });
  });
});
