import { createContext } from "react";

export interface SelectContextType {
    value: unknown | unknown[];
    multiple: boolean;
    readonly: boolean;
    setValue: (value: unknown) => unknown;
    setOpen: (value: boolean) => unknown;
}

export const SelectContext = createContext<SelectContextType>({
    value: undefined,
    multiple: false,
    readonly: false,
    setValue: () => undefined,
    setOpen: () => undefined,
});
export const SelectProvider = SelectContext.Provider;
export const SelectConsumer = SelectContext.Consumer;
