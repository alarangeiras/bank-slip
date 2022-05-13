import { SlipRepository } from "@/domain/repositories/slip.repository";
import { SlipDynamoRepository } from "@/infra/repositories/slip-dynamodb.repository";

export const initSlipRepository = (): SlipRepository => {
    return new SlipDynamoRepository()
}