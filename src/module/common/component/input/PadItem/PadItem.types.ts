import { ReactElement } from "react";
export type ZeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface PadItemProps {
    number?: ZeroToNine,
    icon?: ReactElement,
}