import { createContext } from "react";

export interface ConfirmPinContextInterface {
    open: boolean;
    showConfirmPinModal: () => void;
    hideConfirmPinModal: () => void;
}

export const ConfirmPinContext = createContext<ConfirmPinContextInterface>({
    open: false,
    showConfirmPinModal: () => {},
    hideConfirmPinModal: () => {},
});

export const ConfirmPinProvider = ConfirmPinContext.Provider;
export const ConfirmPinConsumer = ConfirmPinContext.Consumer;
