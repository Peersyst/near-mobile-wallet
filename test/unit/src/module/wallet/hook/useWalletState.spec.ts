import { renderHook } from "test-utils";
import useWalletState from "module/wallet/hook/useWalletState";
import { act } from "@testing-library/react-hooks";

describe("useWalletState tests", () => {
    test("sets isAuthenticated", () => {
        const { result } = renderHook(() => useWalletState());
        act(() => result.current.setAuthenticated(true));
        expect(result.current.state.isAuthenticated).toBe(true);
    });

    test("sets cells", () => {
        const { result } = renderHook(() => useWalletState());
        act(() =>
            result.current.setWallets([
                { name: "wallet1", index: 0, colorIndex: 0 },
                { name: "wallet2", index: 1, colorIndex: 1 },
            ]),
        );
        expect(result.current.state.wallets).toEqual([
            { name: "wallet1", index: 0, colorIndex: 0 },
            { name: "wallet2", index: 1, colorIndex: 1 },
        ]);
    });

    test("sets selectedWallet", () => {
        const { result } = renderHook(() => useWalletState());
        act(() => result.current.setSelectedWallet(1));
        expect(result.current.state.selectedWallet).toBe(1);
    });

    test("state is reset", () => {
        const { result } = renderHook(() => useWalletState());
        act(() =>
            result.current.setState({
                isAuthenticated: true,
                isFirstTime: true,
                hasWallet: true,
                selectedWallet: 2,
                wallets: [
                    { name: "wallet1", index: 0, colorIndex: 0 },
                    { name: "wallet2", index: 1, colorIndex: 1 },
                ],
            }),
        );
        expect(result.current.state).toEqual({
            isAuthenticated: true,
            isFirstTime: true,
            hasWallet: true,
            selectedWallet: 2,
            wallets: [
                { name: "wallet1", index: 0, colorIndex: 0 },
                { name: "wallet2", index: 1, colorIndex: 1 },
            ],
        });
        act(() => result.current.reset());
        expect(result.current.state).toEqual({ hasWallet: false, isAuthenticated: false, isFirstTime: false, wallets: [] });
    });
});
