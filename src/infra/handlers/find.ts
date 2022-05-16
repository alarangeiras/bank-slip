import { FindSlipInput } from '@/application/controllers/input/find-slip.input';
import { initSlipController } from '@/init/controllers/init-slip-controller';
import { wrapApiErrors } from '@/utils/error.util';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = wrapApiErrors(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const controller = initSlipController();
        const id = event.pathParameters!['id'];
        const result = await controller.find(new FindSlipInput(id));
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    },
);
