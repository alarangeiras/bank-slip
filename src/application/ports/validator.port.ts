export interface Validator {
    validate(object: any): Promise<void>;
}
