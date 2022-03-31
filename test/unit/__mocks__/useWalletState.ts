import { UseWalletStateResult } from "module/wallet/hook/useWalletState";
import { wallet } from "mocks/wallet";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import { deepmerge } from "@peersyst/react-utils";

export interface UseWalletStateMockResult extends Omit<Partial<UseWalletStateResult>, "state"> {
    state?: UseWalletStateResult["state"];
}

export const mockedUseWallet: UseWalletStateResult = {
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

const createUseWalletStateMock = ({ state, ...setters }: UseWalletStateMockResult): UseWalletStateResult => ({
    ...mockedUseWallet,
    ...setters,
    state: deepmerge(mockedUseWallet.state, state),
});

export default createUseWalletStateMock;
