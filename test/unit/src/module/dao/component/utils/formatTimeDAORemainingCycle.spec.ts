import { translate } from "locale";
import useFormatTimeDAORemainingCycle from "module/transaction/component/hook/UseFormatTimeDAORemainingCycle/useFormatTimeDAORemaningCycle";
import { act, renderHook } from "test-utils";

const renderUseFormatTimeDAORemainingCycle = () =>
    renderHook(() => {
        return useFormatTimeDAORemainingCycle();
    });

describe("formatTimeDAORemainingCycle tests", () => {
    test("Returns only minutes", () => {
        act(() => {
            const formatTimeDAORemainingCycle = renderUseFormatTimeDAORemainingCycle().result.current;
            expect(formatTimeDAORemainingCycle(45)).toEqual(`00 ${translate("hours")}, 45 ${translate("minutes")}`);
        });
    });
    test("Returns 1 hour and 30 minutes", () => {
        act(() => {
            const formatTimeDAORemainingCycle = renderUseFormatTimeDAORemainingCycle().result.current;
            expect(formatTimeDAORemainingCycle(90)).toEqual(`01 ${translate("hour")}, 30 ${translate("minutes")}`);
        });
    });
    test("Returns some hours with minutes", () => {
        act(() => {
            const formatTimeDAORemainingCycle = renderUseFormatTimeDAORemainingCycle().result.current;
            expect(formatTimeDAORemainingCycle(135)).toEqual(`02 ${translate("hours")}, 15 ${translate("minutes")}`);
        });
    });
    test("Returns one day with hours", () => {
        act(() => {
            const formatTimeDAORemainingCycle = renderUseFormatTimeDAORemainingCycle().result.current;
            expect(formatTimeDAORemainingCycle(60 * 24 + 60 * 4)).toEqual(`1 ${translate("day")}, 04 ${translate("hours")}`);
        });
    });
    test("Returns one day with hours", () => {
        act(() => {
            const formatTimeDAORemainingCycle = renderUseFormatTimeDAORemainingCycle().result.current;
            expect(formatTimeDAORemainingCycle(15 * 60 * 24 + 60 * 15)).toEqual(`15 ${translate("days")}, 15 ${translate("hours")}`);
        });
    });
});
