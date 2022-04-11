import { BaseValidator } from "react-native-components";

export type Validator<TVal = true> = TVal | [TVal, string];

export interface Validators {
    required?: Validator;
    number?: Validator;
    email?: Validator;
    password?: Validator;
    eq?: Validator<any>;
    gt?: Validator<number>;
    gte?: Validator<number>;
    lt?: Validator<number>;
    lte?: Validator<number>;
    minChars?: Validator<number>;
    maxChars?: Validator<number>;
    startsWith?: Validator<string>;
    endsWith?: Validator<string>;
}

export interface FunctionalValidator {
    validate: (value: string) => boolean;
    message: string;
}

export type CustomValidators = (BaseValidator | FunctionalValidator)[] | undefined;

export type ValidatorFactory<TVal = true> = ({ value, message }: { value?: TVal; message?: string }) => BaseValidator;

export type ValidatorKey =
    | "invalid_not_null"
    | "invalid_number"
    | "invalid_email"
    | "invalid_password"
    | "invalid_equal"
    | "invalid_number_gt"
    | "invalid_number_gte"
    | "invalid_number_eq"
    | "invalid_number_lt"
    | "invalid_number_lte"
    | "insufficient_chars"
    | "too_many_chars"
    | "invalid_start"
    | "invalid_end";
