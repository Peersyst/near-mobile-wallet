import Header from "module/common/component/navigation/Header/Header";
import { theme } from "module/common/style/theme";
import { render } from "test-utils";

describe("Notifications tests", () => {
    test("Renders correctly - Light Appearance", () => {
        const screen = render(<Header appearance={"light"} />);
        const Logo = screen.getByText("BULL")
        expect(Logo.props.style.color).toEqual(theme.palette.white);
    });
    test("Renders correctly - Dark Appearance", () => {
        const screen = render(<Header showIcons/>);
        expect(screen.getByTestId("NotificationIcon"));
        expect(screen.getByTestId("SettingsIcon"));
        expect(screen.getByTestId("activeCircle"));
        const Logo = screen.getByText("BULL")
        expect(Logo.props.style.color).toEqual(theme.palette.black);
    });
});
