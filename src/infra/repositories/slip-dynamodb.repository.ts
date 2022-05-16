import { SlipEntity } from '@/domain/entities/slip.entity';
import { SlipRepository } from '@/domain/repositories/slip.repository';
import { DynamoDB } from 'aws-sdk';

export class SlipDynamoRepository implements SlipRepository {
    constructor(private tableName = 'bank-slip', private client = new DynamoDB.DocumentClient()) {}

    async find(code: string): Promise<SlipEntity | undefined> {
        const result = await this.client
            .get({
                TableName: this.tableName,
                Key: {
                    slipCode: code,
                },
                ConsistentRead: true,
            })
            .promise();
        if (result.Item) {
            return {
                code: result.Item.slipCode,
                amount: result.Item.amount,
                expirationDate: result.Item.expirationDate,
            };
        }
        return undefined;
    }
    async create(slip: SlipEntity): Promise<void> {
        const request: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: {
                slipCode: slip.code,
                amount: slip.amount,
                expirationDate: slip.expirationDate,
            },
        };
        await this.client.put(request).promise();
    }
}
