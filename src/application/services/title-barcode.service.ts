import { SlipType } from '@/domain/entities/slip-type.entity';
import { BarcodeService } from '@/domain/services/barcode.service';
import { MTurk } from 'aws-sdk';

export class TitleBarCodeService implements BarcodeService {
  getType(): SlipType {
    return SlipType.TITLE;
  }
  async evaluateBarcode(barcode: string): Promise<boolean> {
    try {
      const fields = this.splitFields(barcode);
      for (const field of fields) {
        const validationResult = this.validateField(field);
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

  private validateField(field: string) {
    const fieldNumbers = field.split('');
    const verificationDigitCandidate = fieldNumbers.pop();
    const reversedFieldNumbers = fieldNumbers.reverse();
    let multiplicationFactor = 2;
    const lineResult: number[] = [];
    for (const fieldNumber of reversedFieldNumbers) {
      const result = parseInt(fieldNumber) * multiplicationFactor;
      lineResult.push(result);
      multiplicationFactor = multiplicationFactor === 2 ? 1 : 2;
    }
    const reversedResult = lineResult.reverse();
    const sumResult = reversedResult
      .join()
      .replace(/,/g, '')
      .split('')
      .reduce((total, current) => total + parseInt(current), 0);
    const rest = sumResult % 10;
    const foundVerificationDigit = 10 - rest;
    return foundVerificationDigit === parseInt(verificationDigitCandidate!);
  }
}
