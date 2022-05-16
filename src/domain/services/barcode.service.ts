export interface BarcodeService {
    evaluateBarcode(barcode: string): Promise<boolean>;
}
