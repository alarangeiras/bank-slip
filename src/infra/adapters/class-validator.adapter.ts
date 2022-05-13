import { Validator } from "@/application/ports/validator.port";

export class ClassValidatorAdapter implements Validator {
    validate(object: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

}