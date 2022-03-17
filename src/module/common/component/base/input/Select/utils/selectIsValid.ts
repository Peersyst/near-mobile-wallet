export interface Option {
    value: unknown;
    label: string;
}

export function selectIsValid(value: unknown, multiple?: boolean, required?: boolean): boolean {
    return !required || (required && (multiple ? !!(value as Array<Option>).length : value !== undefined));
}
