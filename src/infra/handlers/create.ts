import { CreateSlipInput } from '@/application/controllers/input/create-slip.input';
import { initSlipController } from '@/init/controllers/init-slip-controller';
import { wrapApiErrors } from '@/utils/error.util';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = wrapApiErrors(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const controller = initSlipController();
        const body = event.body;
        await controller.create(CreateSlipInput.fromJSON(body));
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'Bank slip created successfully',
            }),
        };
    },
);
