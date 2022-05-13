import { SlipType } from '@/domain/entities/slip-type.entity';

export interface BarcodeService {
  getType(): SlipType;
  evaluateBarcode(barcode: string): Promise<boolean>;
}
