import { ApiError } from '@/domain/errors/api.error';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

type WrappedApiFunction = (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

export const wrapApiErrors = (wrappedFunction: WrappedApiFunction): APIGatewayProxyHandler => {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      return await wrappedFunction(event);
    } catch (error) {
      if (error instanceof ApiError) {
        const apiError = <ApiError>error;
        return {
          statusCode: apiError.code,
          body: JSON.stringify(apiError.body),
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
};
