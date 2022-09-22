import GeneralSettingsScreen from "module/settings/screen/GeneralSettingsScreen";
import { render, translate } from "test-utils";
import * as Recoil from "recoil";
import { defaultSettingsState } from "module/settings/state/SettingsState";

describe("Test of the General Settings screen", () => {
    test("Renders correctly", () => {
        const setSendState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSendState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const screen = render(<GeneralSettingsScreen navigation={jest.fn() as any} />);

        //Selector of the network
        /* expect(screen.getAllByText(translate("select_your_network"))).toHaveLength(2);
        expect(screen.getByText(translate("network_name", { name: "Testnet" }))).toBeDefined();
        expect(screen.getAllByText(translate("network_name", { name: "Mainnet" }))).toHaveLength(2); */

        //Selector of the fee
        expect(screen.getAllByText(translate("modify_default_fee"))).toHaveLength(2);
        expect(screen.getByText(translate("slow"))).toBeDefined();
        expect(screen.getByText(translate("fast"))).toBeDefined();
        expect(screen.getAllByText(translate("average"))).toHaveLength(2);

        //Selector of the currency
        expect(screen.getAllByText(translate("default_currency"))).toHaveLength(2);
        expect(screen.getAllByText("USD")).toHaveLength(2);
        expect(screen.getByText("EUR")).toBeDefined();
        expect(screen.getByText("GBP")).toBeDefined();
        expect(screen.getByText("JPY")).toBeDefined();
        expect(screen.getByText("CNY")).toBeDefined();

        //Selector of the locale
        expect(screen.getAllByText(translate("select_locale"))).toHaveLength(2);
        expect(screen.getAllByText(translate("en"))).toHaveLength(2);
        expect(screen.getByText(translate("es"))).toBeDefined();
    });
});
