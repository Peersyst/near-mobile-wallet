import { renderHook } from "test-utils";
import useWallet from "module/wallet/hook/useWallet";
import { UseWalletStateMock } from "test-mocks";

describe("useWallet tests", () => {
    test("Returns the wallet with the given index", () => {
        const { state } = new UseWalletStateMock();
        const { result } = renderHook(() => useWallet(0));
        expect(result.current).toEqual(state.wallets[0]);
    });
});
