import { SlipEntity } from '@/domain/entities/slip.entity';

export interface SlipService {
  find(code: string): Promise<SlipEntity>;
  create(slip: SlipEntity): Promise<void>;
}
