import { translate } from "locale";
import GeneralSettingsScreen from "module/settings/screen/GeneralSettingsScreen";
import { render } from "test-utils";

describe("Test of the General Settings screen", () => {
    test("Renders correctly", () => {
        const screen = render(<GeneralSettingsScreen navigation={jest.fn() as any} />);
        expect(screen.getByText(translate("select_your_network"))).toBeDefined();
        expect(screen.getByText(translate("modify_default_fee"))).toBeDefined();
    });
});
