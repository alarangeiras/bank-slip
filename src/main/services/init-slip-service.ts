import { SlipServiceImpl } from "@/application/services/slip.service";
import { SlipService } from "@/domain/services/slip.service";
import { initSlipRepository } from "@/main/reposotories/init-slip-repository";

export const initSlipService = (): SlipService => {
    return new SlipServiceImpl(initSlipRepository());
}