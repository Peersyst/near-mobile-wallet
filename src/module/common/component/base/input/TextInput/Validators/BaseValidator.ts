export abstract class BaseValidator {
    message;

    protected constructor(message: string) {
        this.message = message;
    }

    abstract validate(value: any): boolean;
}
