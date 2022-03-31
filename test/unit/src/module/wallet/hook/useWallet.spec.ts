import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { renderHook } from "test-utils";
import useWallet from "module/wallet/hook/useWallet";

describe("useWallet tests", () => {
    test("Returns the wallet with the given index", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        const { result } = renderHook(() => useWallet(0));
        expect(result.current).toEqual(mockedUseWallet.state.wallets[0]);
    });
});
