import { renderHook } from "test-utils";
import useEditWallet from "module/wallet/hook/useEditWallet";
import { act } from "@testing-library/react-hooks";
import { UseWalletStateMock } from "test-mocks";

describe("useEditWallet tests", () => {
    const setWallets = jest.fn();
    const useWalletStateResultMock = new UseWalletStateMock({ setWallets });

    afterAll(() => {
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
