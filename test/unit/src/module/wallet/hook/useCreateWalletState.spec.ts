import { renderHook } from "test-utils";
import useCreateWalletState from "module/wallet/hook/useCreateWalletState";
import { act } from "react-test-renderer";

describe("useCreateWalletState tests", () => {
    test("Sets name", () => {
        const { result } = renderHook(() => useCreateWalletState());
        act(() => result.current.setName("Wallet Name"));
        expect(result.current.state.name).toEqual("Wallet Name");
    });
    test("Sets pin", () => {
        const { result } = renderHook(() => useCreateWalletState());
        act(() => result.current.setPin("1234"));
        expect(result.current.state.pin).toEqual("1234");
    });
    test("Sets mnemonic", () => {
        const { result } = renderHook(() => useCreateWalletState());
        act(() => result.current.setMnemonic(["Pasta", "Pizza", "Coin"]));
        expect(result.current.state.mnemonic).toEqual(["Pasta", "Pizza", "Coin"]);
    });
});
