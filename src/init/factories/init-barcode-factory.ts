import { BarcodeFactory } from '@/application/factories/barcode.factory';

export const initBarCodeFactory = (): BarcodeFactory => {
  const allowedBarcodeTypes = [];
  return new BarcodeFactory(allowedBarcodeTypes);
};
