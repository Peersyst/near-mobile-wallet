import { renderHook } from "test-utils";
import useWallet from "module/wallet/hook/useWallet";
import { act } from "@testing-library/react-hooks";
import { cells } from "module/wallet/mock/cells";

describe("useWallet tests", () => {
    test("sets isAuthenticated", () => {
        const { result } = renderHook(() => useWallet());
        act(() => result.current.setAuthenticated(true));
        expect(result.current.state.isAuthenticated).toBe(true);
    });

    test("sets cells", () => {
        const { result } = renderHook(() => useWallet());
        act(() =>
            result.current.setCells([
                { address: "address1", name: "cell1" },
                { address: "address2", name: "cell2" },
            ]),
        );
        expect(result.current.state.cells).toEqual([
            { address: "address1", name: "cell1" },
            { address: "address2", name: "cell2" },
        ]);
    });

    test("sets selectedAccount", () => {
        const { result } = renderHook(() => useWallet());
        act(() => result.current.setSelectedAccount(1));
        expect(result.current.state.selectedAccount).toBe(1);
    });

    test("state is reset", () => {
        const { result } = renderHook(() => useWallet());
        act(() =>
            result.current.setState({
                isAuthenticated: true,
                isFirstTime: true,
                hasWallet: true,
                selectedAccount: 2,
                name: "Name",
                cells: [
                    { address: "address1", name: "cell1" },
                    { address: "address2", name: "cell2" },
                ],
            }),
        );
        expect(result.current.state).toEqual({
            isAuthenticated: true,
            isFirstTime: true,
            hasWallet: true,
            selectedAccount: 2,
            name: "Name",
            cells: [
                { address: "address1", name: "cell1" },
                { address: "address2", name: "cell2" },
            ],
        });
        act(() => result.current.reset());
        expect(result.current.state).toEqual({ hasWallet: false, isAuthenticated: false, isFirstTime: false, cells: cells });
    });
});
