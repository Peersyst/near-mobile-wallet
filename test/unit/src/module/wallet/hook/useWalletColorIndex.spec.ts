import { renderHook } from "test-utils";
import useWalletColorIndex from "module/wallet/hook/useWalletColorIndex";
import lightTheme from "config/theme/lightTheme";

describe("useWalletColorIndex tests", () => {
    test("Returns right color", () => {
        const { result } = renderHook(() => useWalletColorIndex(1));
        expect(result.current).toEqual(lightTheme.palette.wallet[1]);
    });
});
