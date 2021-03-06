import { ApiError } from '@/domain/errors/api.error';

export class SlipNotFoundError extends ApiError {
    constructor(code: string) {
        super(404, {
            message: `the slip ${code} does not exists`,
        });
    }
}
