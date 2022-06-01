import { UseCreateWalletResult } from "module/wallet/hook/useCreateWallet";

export const createMockedUseCreateWallet = (
    setPin?: jest.Mock<any, any>,
    setName?: jest.Mock<any, any>,
    setMnemonic?: jest.Mock<any, any>,
): UseCreateWalletResult => {
    return {
        state: { name: undefined, pin: undefined, mnemonic: undefined },
        setName: setName || jest.fn(),
        setPin: setPin || jest.fn(),
        setMnemonic: setMnemonic || jest.fn(),
    };
};
