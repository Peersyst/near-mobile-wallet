import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { renderHook } from "test-utils";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";

describe("useSelectedWallet tests", () => {
    test("Returns selected wallet", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        const { result } = renderHook(() => useSelectedWallet());
        expect(result.current).toEqual(mockedUseWallet.state.wallets[0]);
    });

    test("Returns first wallet when no wallet is selected", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue({
            ...mockedUseWallet,
            state: { ...mockedUseWallet.state, selectedWallet: undefined },
        });
        const { result } = renderHook(() => useSelectedWallet());
        expect(result.current).toEqual(mockedUseWallet.state.wallets[0]);
    });
});
