import { defaultSettingsState } from "module/settings/state/SettingsState";
import { fireEvent, render } from "test-utils";
import * as Recoil from "recoil";
import { translate } from "locale";
import { SettingsStorage } from "module/settings/SettingsStorage";
import SelectLocale from "module/settings/components/core/SelectLocale/SelectLocale";

describe("Test for the select locale component", () => {
    test("Renders correctly", () => {
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const screen = render(<SelectLocale />);
        expect(screen.getAllByText(translate("select_locale"))).toHaveLength(2);
        expect(screen.getAllByText(translate("en"))).toHaveLength(2);
        expect(screen.getByText(translate("es"))).toBeDefined();
    });
    test("Change the locale correctly", () => {
        jest.useFakeTimers();
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockImplementation(() => new Promise((resolve) => resolve()));
        const screen = render(<SelectLocale />);
        const item = screen.getByText(translate("es"));
        fireEvent.press(item);
        jest.runAllTimers();
        expect(setSettingsStorage).toHaveBeenCalledWith({ locale: "es" });
        expect(setSettingsState).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
