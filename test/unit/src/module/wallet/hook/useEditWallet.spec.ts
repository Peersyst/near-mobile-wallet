import * as UseWalletState from "module/wallet/hook/useWalletState";
import createUseWalletStateMock from "mocks/useWalletState";
import { renderHook } from "test-utils";
import useEditWallet from "module/wallet/hook/useEditWallet";
import { act } from "@testing-library/react-hooks";

describe("useEditWallet tests", () => {
    const setName = jest.fn();
    const setColorIndex = jest.fn();

    afterEach(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(createUseWalletStateMock());
    });

    test("Sets name", () => {
        const { result } = renderHook(() => useEditWallet(0));
        act(() => result.current.setName(""));
    });
});
