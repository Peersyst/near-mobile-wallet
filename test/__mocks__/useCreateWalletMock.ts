import { UseCreateWalletResult } from "module/wallet/hook/useCreateWallet";
import { deepmerge } from "@peersyst/react-utils";

export interface UseCreateWalletMockResult extends Omit<Partial<UseCreateWalletResult>, "state"> {
    state?: Partial<UseCreateWalletResult["state"]>;
}

export const defaultUseCreateWalletMock: UseCreateWalletResult = {
    state: { name: undefined, pin: undefined, mnemonic: undefined, colorIndex: undefined },
    setName: jest.fn(),
    setPin: jest.fn(),
    setMnemonic: jest.fn(),
    setColorIndex: jest.fn(),
    reset: jest.fn(),
};

const createUseCreateWalletMock = ({ state, ...setters }: UseCreateWalletMockResult = {}): UseCreateWalletResult => ({
    ...defaultUseCreateWalletMock,
    ...setters,
    state: deepmerge(defaultUseCreateWalletMock.state, state),
});

export default createUseCreateWalletMock;
