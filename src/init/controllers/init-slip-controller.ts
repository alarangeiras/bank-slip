import { SlipController } from '@/application/controllers/slip.controller';
import { initClassValidatorAdapter } from '@/init/adapters/init-class-validator-adapter';
import { initSlipService } from '@/init/services/init-slip-service';

export const initSlipController = (): SlipController => {
    return new SlipController(initSlipService(), initClassValidatorAdapter());
};
