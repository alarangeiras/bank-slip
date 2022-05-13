import { SlipType } from '@/domain/entities/slip-type.entity';
import { BarcodeService } from '@/domain/services/barcode.service';

export class AgreementBarcodeService implements BarcodeService {
  getType(): SlipType {
    throw new Error('Method not implemented.');
  }
  evaluateBarcode(barcode: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
