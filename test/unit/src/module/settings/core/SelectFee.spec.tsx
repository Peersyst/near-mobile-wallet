import SelectFee from "module/settings/components/core/SelectFee/SelectFee";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import { fireEvent, render, translate } from "test-utils";
import * as Recoil from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { FeeRate } from "ckb-peersyst-sdk";

describe("Test for the SelectFee component", () => {
    test("Renders correctly", () => {
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const screen = render(<SelectFee />);
        expect(screen.getByText(translate("modify_default_fee"))).toBeDefined();
        expect(screen.getAllByText(translate("average"))).toBeDefined();
    });
    test("Change the fee correctly", async () => {
        jest.useFakeTimers();
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockResolvedValue();
        const screen = render(<SelectFee />);
        const item = screen.getByText(translate("average"));
        fireEvent.press(item);
        const fastItem = await screen.findByText(translate("fast"));
        expect(fastItem).toBeDefined();
        fireEvent.press(fastItem);
        jest.runAllTimers();
        expect(setSettingsStorage).toHaveBeenCalledWith({ fee: FeeRate.FAST });
        expect(setSettingsState).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
