import { SlipDto } from '@/application/dto/slip.dto';
import { initSlipController } from '@/main/controllers/init-slip-controller';
import { wrapApiErrors } from '@/utils/error.util';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = wrapApiErrors(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		const controller = initSlipController();
		const body = event.body;
		await controller.create(SlipDto.fromJSON(body));
		return {
			statusCode: 201,
			body: JSON.stringify({
				message: 'Bank slip created successfully',
			}),
		};
	},
);
