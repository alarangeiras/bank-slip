import { SlipController } from '@/application/controllers/slip.controller';
import { initSlipService } from '@/main/services/init-slip-service';

export const initSlipController = (): SlipController => {
	return new SlipController(initSlipService());
};
