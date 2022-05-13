import { IsSlip } from '@/infra/custom-validators/is-slip.validator';
import { IsString } from 'class-validator';

export class FindSlipInput {
  @IsString()
  @IsSlip()
  code?: string;
  constructor(code?: string) {
    this.code = code;
  }
}
