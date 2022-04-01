import * as UseWalletState from "module/wallet/hook/useWalletState";
import createUseWalletStateMock from "mocks/useWalletState";
import { renderHook } from "test-utils";
import useEditWallet from "module/wallet/hook/useEditWallet";
import { act } from "@testing-library/react-hooks";

describe("useEditWallet tests", () => {
    const setWallets = jest.fn();
    const useWalletStateResultMock = createUseWalletStateMock({ setWallets });

    beforeEach(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(useWalletStateResultMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Sets name", () => {
        const { result } = renderHook(() => useEditWallet(0));
        act(() => result.current.setName("Modified name"));
        expect(setWallets).toHaveBeenCalledWith([
            { ...useWalletStateResultMock.state.wallets[0], name: "Modified name" },
            useWalletStateResultMock.state.wallets[1],
        ]);
    });

    test("Sets colorIndex", () => {
        const { result } = renderHook(() => useEditWallet(0));
        act(() => result.current.setColorIndex(2));
        expect(setWallets).toHaveBeenCalledWith([
            { ...useWalletStateResultMock.state.wallets[0], colorIndex: 2 },
            useWalletStateResultMock.state.wallets[1],
        ]);
    });

    test("Resets wallet", () => {
        const { result } = renderHook(() => useEditWallet(0));
        act(() => result.current.reset());
        expect(setWallets).toHaveBeenCalledWith(useWalletStateResultMock.state.wallets);
    });
});
