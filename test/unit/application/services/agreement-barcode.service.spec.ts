import { AgreementBarcodeService } from '@/application/services/agreement-barcode.service';

describe(AgreementBarcodeService.name.toString(), () => {
  describe(AgreementBarcodeService.prototype.evaluateBarcode.name.toString(), () => {
    let barcodeService: AgreementBarcodeService;
    beforeEach(() => {
      barcodeService = new AgreementBarcodeService();
    });
    test('should validate successfuly a barcode', async () => {
      const barcode = '817700000000010936599702411310797039001433708318';
      const result = await barcodeService.evaluateBarcode(barcode);
      expect(result).toBeTruthy();
    });
    test('should validate a barcode with error', async () => {
      const barcode = '817700000000010936599702411310797039001433708319';
      const result = await barcodeService.evaluateBarcode(barcode);
      expect(result).toBeFalsy();
    });
  });
});
