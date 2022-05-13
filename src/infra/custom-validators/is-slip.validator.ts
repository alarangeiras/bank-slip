import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsSlip(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsSlip',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const [relatedPropertyName] = args.constraints;
					const relatedValue = (args.object as any)[relatedPropertyName];
					return (
						typeof value === 'string' &&
						typeof relatedValue === 'string' &&
						value.length > relatedValue.length
					); // you can return a Promise<boolean> here as well, if you want to make async validation
				},
			},
		});
	};
}
