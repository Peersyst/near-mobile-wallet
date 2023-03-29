import GeneralSettingsScreen from "module/settings/screen/GeneralSettingsScreen";
import { render, translate } from "test-utils";
import * as Recoil from "recoil";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import { capitalize } from "@peersyst/react-utils";

describe("Test of the General Settings screen", () => {
    test("Renders correctly", () => {
        const setSendState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSendState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const screen = render(<GeneralSettingsScreen />);

        //Selector of the network
        expect(screen.getByText(translate("select_your_network"))).toBeDefined();
        expect(screen.getByText(translate("network_name", { name: capitalize(defaultSettingsState.network) }))).toBeDefined();

        //Selector of the currency
        expect(screen.getByText(translate("default_currency"))).toBeDefined();
        expect(screen.getByText("USD")).toBeDefined();

        //Selector of the locale
        expect(screen.getByText(translate("select_locale"))).toBeDefined();
        expect(screen.getByText(translate("en", { ns: "langs" }))).toBeDefined();
    });
});
