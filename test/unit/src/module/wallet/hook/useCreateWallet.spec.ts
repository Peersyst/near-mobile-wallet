import { act, renderHook } from "test-utils";
import useCreateWallet from "module/wallet/hook/useCreateWallet";

describe("useCreateWallet tests", () => {
    test("Sets name", () => {
        const { result } = renderHook(() => useCreateWallet());
        act(() => result.current.setName("Wallet Name"));
        expect(result.current.state.name).toEqual("Wallet Name");
    });
    test("Sets pin", () => {
        const { result } = renderHook(() => useCreateWallet());
        act(() => result.current.setPin("1234"));
        expect(result.current.state.pin).toEqual("1234");
    });
    test("Sets mnemonic", () => {
        const { result } = renderHook(() => useCreateWallet());
        act(() => result.current.setMnemonic(["Pasta", "Pizza", "Coin"]));
        expect(result.current.state.mnemonic).toEqual(["Pasta", "Pizza", "Coin"]);
    });
});
