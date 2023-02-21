import { defaultSettingsState } from "module/settings/state/SettingsState";
import { fireEvent, render, translate } from "test-utils";
import * as Recoil from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";
import SelectLocale from "module/settings/components/core/SelectLocale/SelectLocale";

describe("Test for the select locale component", () => {
    test("Renders correctly", () => {
        const screen = render(<SelectLocale />);
        expect(screen.getByText(translate("select_locale"))).toBeDefined();
        expect(screen.getByText(translate("en"))).toBeDefined();
    });
    test("Change the locale correctly", () => {
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockResolvedValue();
        const screen = render(<SelectLocale />);
        const enItem = screen.getByText(translate("en"));
        fireEvent.press(enItem); //open the modal
        const esItem = screen.getByText(translate("es"));
        fireEvent.press(esItem); //select the es locale
        expect(setSettingsStorage).toHaveBeenCalledWith({ locale: "es" });
        expect(setSettingsState).toHaveBeenCalled();
    });
});
