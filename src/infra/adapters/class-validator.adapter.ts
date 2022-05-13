import { Validator } from '@/application/ports/validator.port';
import { ValidationError } from '@/domain/errors/validation.error';
import { validate } from 'class-validator';

export class ClassValidatorAdapter implements Validator {
  async validate(object: any): Promise<void> {
    const validationErrors = await validate(object);
    if (validationErrors && validationErrors.length > 0) {
      const messages = validationErrors.flatMap((error) => {
        return Object.values(error.constraints!);
      });
      throw new ValidationError(messages);
    }
  }
}
