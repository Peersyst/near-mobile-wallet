import { UseWalletResult } from "module/wallet/hook/useWalletState";
import { wallet } from "mocks/wallet";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

export const mockedUseWallet: UseWalletResult = {
    state: {
        hasWallet: true,
        isAuthenticated: true,
        isFirstTime: false,
        wallets: [wallet, { name: "secondWallet", index: 1, colorIndex: 1, serviceInstance: new CkbServiceMock([]) }],
        selectedWallet: 0,
    },
    setAuthenticated: jest.fn(),
    setWallets: jest.fn(),
    setSelectedWallet: jest.fn(),
    setState: jest.fn(),
    reset: jest.fn(),
};
