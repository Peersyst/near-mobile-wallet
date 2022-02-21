import { render } from "test-utils";
import Notification from "module/common/component/display/Notification/Notification";
import { theme } from "module/common/style/theme";

describe("Notifications tests", () => {
    test("Renders correctly", () => {
        const screen = render(<Notification />);
        expect(screen.getByTestId("NotificationIcon"));
        expect(screen.getByTestId("activeCircle"));
    });
    test("Renders notification active", () => {
        const screen = render(<Notification hasNotifications/>);
        const circle = screen.getByTestId("activeCircle");
        expect(circle.props.style.backgroundColor).toEqual(theme.palette.red);
    });
});
