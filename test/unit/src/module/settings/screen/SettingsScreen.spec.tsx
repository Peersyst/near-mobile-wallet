import { render } from "test-utils";
import { translate } from "locale";
import SettingsScreen from "module/settings/screen/SettingsScreen";

describe("SettingsScreen tests", () => {
    test("Renders correctly", () => {
        const screen = render(<SettingsScreen />);

        expect(screen.getByText(translate("settings")));
    });
});
