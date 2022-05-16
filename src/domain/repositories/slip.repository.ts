import { SlipEntity } from '@/domain/entities/slip.entity';

export interface SlipRepository {
    find(code: string): Promise<SlipEntity | undefined>;
    create(slip: SlipEntity): Promise<void>;
}
