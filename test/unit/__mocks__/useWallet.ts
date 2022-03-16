import { UseWalletResult } from "module/wallet/hook/useWallet";

export const mockedUseWallet: UseWalletResult = {
    state: {
        hasWallet: true,
        isAuthenticated: true,
        isFirstTime: false,
        cells: [{ address: "address", balance: "1", name: "Name" }],
        selectedAccount: 0,
    },
    setAuthenticated: jest.fn(),
    setCells: jest.fn(),
    setSelectedAccount: jest.fn(),
    setState: jest.fn(),
    reset: jest.fn(),
};
