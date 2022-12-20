import SwitchTheme from "module/settings/components/core/SwitchTheme/SwitchTheme";
import { UseSetThemeMock } from "test-mocks";
import { fireEvent, render, screen, translate } from "test-utils";

describe("SwitchTheme", () => {
    test("should render the SwitchTheme component", async () => {
        //Obs: by default the theme is light
        const { setTheme } = new UseSetThemeMock();
        render(<SwitchTheme />);
        expect(screen.getByText(translate("select_theme")));
        const btn = screen.getByTestId("MoonIcon");
        expect(btn);
        expect(screen.queryByTestId("SunIcon")).toBeNull();
        fireEvent.press(btn);
        expect(setTheme).toBeCalledWith("dark");
    });
});
