import { SlipServiceImpl } from '@/application/services/slip.service';
import { SlipService } from '@/domain/services/slip.service';
import { initBarCodeFactory } from '@/init/factories/init-barcode-factory';
import { initSlipRepository } from '@/init/reposotories/init-slip-repository';

export const initSlipService = (): SlipService => {
    return new SlipServiceImpl(initSlipRepository(), initBarCodeFactory());
};
