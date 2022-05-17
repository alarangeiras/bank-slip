import { SlipEntity } from '@/domain/entities/slip.entity';
import { ValidationError } from '@/domain/errors/validation.error';
import { IsSlip } from '@/infra/custom-validators/is-slip.validator';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateSlipInput {
    @IsSlip()
    @IsString()
    code: string;

    @IsString()
    barCode: string;

    @IsNumber()
    amount: number;

    @IsDate()
    expirationDate: Date;

    constructor(code: string, barCode: string, amount: number, expirationDate: Date) {
        this.code = code;
        this.barCode = barCode;
        this.amount = amount;
        this.expirationDate = expirationDate;
    }

    async toEntity(): Promise<SlipEntity> {
        return {
            code: this.code,
            barCode: this.barCode,
            amount: this.amount,
            expirationDate: this.expirationDate,
        };
    }

    static fromEntity(entity: SlipEntity): CreateSlipInput {
        return new CreateSlipInput(
            entity.code,
            entity.barCode,
            entity.amount,
            entity.expirationDate,
        );
    }

    static fromJSON(jsonString: string | null): CreateSlipInput {
        if (!jsonString) {
            throw new ValidationError(['payload not informed']);
        }
        const object = JSON.parse(jsonString!);

        return new CreateSlipInput(
            object.code,
            object.barCode,
            parseFloat(object.amount),
            new Date(object.expirationDate),
        );
    }
}
