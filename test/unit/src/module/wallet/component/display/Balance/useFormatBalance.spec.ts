import { useFormatBalance, UseFormatBalanceParams } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import { renderHook } from "test-utils";

const renderUseFormatBalance = (props: UseFormatBalanceParams) => {
    const { result } = renderHook(() => useFormatBalance(props));
    return result.current;
};

describe("useFormatBalance", () => {
    test("Renders display", () => {
        const res = renderUseFormatBalance({
            balance: 12345,
            action: "add",
            units: "token",
        });
        expect(res).toBe("+12,345 NEAR");
    });
});
