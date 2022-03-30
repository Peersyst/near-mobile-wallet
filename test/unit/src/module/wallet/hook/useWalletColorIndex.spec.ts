import { renderHook } from "test-utils";
import useWalletColorIndex from "module/wallet/hook/useWalletColorIndex";
import { theme } from "module/common/style/theme";

describe("useWalletColorIndex tests", () => {
    test("Returns right color", () => {
        const { result } = renderHook(() => useWalletColorIndex(1));
        expect(result.current).toEqual(theme.palette.wallet[1]);
    });
});
