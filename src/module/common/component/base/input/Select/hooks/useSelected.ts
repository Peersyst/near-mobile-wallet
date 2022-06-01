import { useMemo } from "react";
import { itemIsSelected } from "../utils/itemIsSelected";

export function useSelected(value: unknown, selected: unknown | unknown[], multiple: boolean): boolean {
    return useMemo(() => itemIsSelected(value, selected, multiple), [value, selected, multiple]);
}
