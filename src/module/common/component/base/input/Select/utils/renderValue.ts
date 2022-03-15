import { ReactNode } from "react";

export function renderValue(value: ReactNode | ReactNode[]): ReactNode {
    if (Array.isArray(value)) return value.join(", ");
    else return value;
}
