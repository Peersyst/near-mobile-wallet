import WelcomeBackPage from "module/auth/page/WelcomeBackPage/WelcomeBackPage";
import { render } from "test-utils";
import { translate } from "locale";
import * as Navigation from "@react-navigation/native";

describe("Welcome back page", () => {
    test("Renders correctly", async () => {
        jest.useFakeTimers();
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<WelcomeBackPage />);
        expect(screen.getByTestId("LogoColIcon")).toBeDefined();
        expect(screen.getByText(translate("welcome_back")));
        jest.runAllTimers();
        expect(mockedNavigation).toHaveBeenCalledWith("Main");
        jest.useRealTimers();
    });
});
