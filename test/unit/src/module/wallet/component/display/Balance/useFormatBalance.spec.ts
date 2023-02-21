import { useFormatBalance } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import { renderHook } from "test-utils";

const renderUseFormatBalance = (...params: Parameters<typeof useFormatBalance>) => {
    const { result } = renderHook(() => useFormatBalance(...params));
    return result.current;
};

describe("useFormatBalance", () => {
    test("Renders display", () => {
        const res = renderUseFormatBalance(12345, {
            action: "add",
            units: "token",
        });
        expect(res).toBe("+12,345 NEAR");
    });
});
