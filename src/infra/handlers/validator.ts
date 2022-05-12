import { ApiError } from '@/domain/errors/api.error';
import { initSlipValidatorAdapter } from '@/main/adapters/init-slip-validator-adapter';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
export const handler: APIGatewayProxyHandler = async (
	event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
	try {
		const id = event.pathParameters!['id'];
		const validator = initSlipValidatorAdapter({ barCodeContent: id });
		await validator.validate();
		return {
			statusCode: 200,
			body: '',
		};
	} catch (error) {
		if (error instanceof ApiError) {
			const apiError = <ApiError>error;
			return {
				statusCode: apiError.code,
				body: JSON.stringify({
					description: apiError.message,
				}),
			};
		}
		return {
			statusCode: 500,
			body: JSON.stringify({
				description: error.message,
			}),
		};
	}
};
