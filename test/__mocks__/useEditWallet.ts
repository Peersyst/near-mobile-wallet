import { UseEditWalletResult } from "module/wallet/hook/useEditWallet";
import { deepmerge } from "@peersyst/react-utils";

export interface UseEditWalletMockResult extends Omit<UseEditWalletResult, "initialState"> {
    initialState: Partial<UseEditWalletResult["initialState"]>;
}

export const useEditWalletMock: UseEditWalletResult = {
    setName: jest.fn(),
    setColorIndex: jest.fn(),
    reset: jest.fn(),
    initialState: { name: "Wallet", colorIndex: 0 },
};

const createEditWalletMock = ({ initialState, ...rest }: Partial<UseEditWalletMockResult>): UseEditWalletResult => ({
    ...useEditWalletMock,
    ...rest,
    initialState: deepmerge(useEditWalletMock.initialState, initialState),
});

export default createEditWalletMock;
