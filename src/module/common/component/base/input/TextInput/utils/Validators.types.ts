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
    | "invalid_number_lte";

export type TranslateFn<T extends ValidatorKey = ValidatorKey> = (w: T) => string;
