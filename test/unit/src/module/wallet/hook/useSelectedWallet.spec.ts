import { renderHook } from "test-utils";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { UseWalletStateMock, WalletStateMock } from "test-mocks";

describe("useSelectedWallet tests", () => {
    test("Returns selected wallet", () => {
        const { state } = new UseWalletStateMock();
        const { result } = renderHook(() => useSelectedWallet());
        expect(result.current).toEqual(state.wallets[0]);
    });

    test("Returns first wallet when no wallet is selected", () => {
        const state = new WalletStateMock({ selectedWallet: undefined });
        new UseWalletStateMock({ state });
        const { result } = renderHook(() => useSelectedWallet());
        expect(result.current).toEqual(state.wallets[0]);
    });
});
