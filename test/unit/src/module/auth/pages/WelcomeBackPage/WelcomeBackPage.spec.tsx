import WelcomeBackPage from "module/auth/page/WelcomeBackPage/WelcomeBackPage";
import { render } from "test-utils";
import { translate } from "locale";

describe("Welcome back page", () => {
    test("Renders correctly", () => {
        const screen = render(<WelcomeBackPage />);
        expect(screen.getByTestId("LogoColIcon")).toBeDefined();
        expect(screen.getByText(translate("welcome_back")));
    });
});
