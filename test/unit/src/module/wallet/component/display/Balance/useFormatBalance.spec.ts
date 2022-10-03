import { useFormatBalance, UseFormatBalanceParams } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import { act } from "react-test-renderer";
import { renderHook } from "test-utils";

const renderUseFormatBalance = (props: UseFormatBalanceParams) => {
    const { result } = renderHook(() => useFormatBalance(props));
    return result.current;
};

describe("useFormatBalance", () => {
    test("Renders display", async () => {
        await act(async () => {
            const res = renderUseFormatBalance({
                balance: 12345,
                action: "add",
                units: "token",
            });
            setTimeout(() => {
                expect(res).toBe("+12,345 NEAR");
            }, 1);
        });
    });
});
