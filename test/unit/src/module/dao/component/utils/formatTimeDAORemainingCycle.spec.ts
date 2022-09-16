import useFormatTimeDAORemainingCycle from "module/transaction/component/hook/UseFormatTimeDAORemainingCycle/useFormatTimeDAORemaningCycle";
import { renderHook, translate } from "test-utils";

const renderUseFormatTimeDAORemainingCycle = () =>
    renderHook(() => {
        return useFormatTimeDAORemainingCycle();
    });

describe("formatTimeDAORemainingCycle tests", () => {
    const formatTimeDAORemainingCycle = renderUseFormatTimeDAORemainingCycle().result.current;
    test("Returns only minutes", () => {
        expect(formatTimeDAORemainingCycle(45)).toEqual(`00 ${translate("hours")}, 45 ${translate("minutes")}`);
    });
    test("Returns 1 hour and 30 minutes", () => {
        expect(formatTimeDAORemainingCycle(90)).toEqual(`01 ${translate("hour")}, 30 ${translate("minutes")}`);
    });
    test("Returns some hours with minutes", () => {
        expect(formatTimeDAORemainingCycle(90)).toEqual(`01 ${translate("hour")}, 30 ${translate("minutes")}`);
    });
    test("Returns one day with hours", () => {
        expect(formatTimeDAORemainingCycle(90)).toEqual(`01 ${translate("hour")}, 30 ${translate("minutes")}`);
    });
    test("Returns one day with hours", () => {
        expect(formatTimeDAORemainingCycle(90)).toEqual(`01 ${translate("hour")}, 30 ${translate("minutes")}`);
    });
});
