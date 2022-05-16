import { SlipType } from '@/domain/entities/slip-type.entity';
import { BarcodeService } from '@/domain/services/barcode.service';

export class AgreementBarcodeService implements BarcodeService {
  getType(): SlipType {
    return SlipType.AGREEMENT;
  }
  async evaluateBarcode(barcode: string): Promise<boolean> {
    return true;
  }
}
