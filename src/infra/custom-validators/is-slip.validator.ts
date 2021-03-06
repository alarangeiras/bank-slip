import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsSlip() {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsSlip',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: {
                message: 'The slip code $value is not valid',
            },
            validator: {
                validate(value: any, args: ValidationArguments): boolean {
                    try {
                        if (typeof value !== 'string') {
                            throw Error();
                        }
                        const stringValue = <string>value;
                        if (stringValue.length < 47 || stringValue.length > 48) {
                            throw Error();
                        }
                        parseInt(stringValue);
                        return true;
                    } catch (error) {
                        return false;
                    }
                },
            },
        });
    };
}
