import WelcomeBackScreen from "module/auth/screen/WelcomeBackScreen/WelcomeBackScreen";
import { render } from "test-utils";
import { translate } from "locale";
import * as UseSetTab from "module/common/component/base/navigation/Tabs/hook/useSetTab";
import { AuthScreens } from "module/auth/AuthNavigatorGroup";

describe("WelcomeBackScreen tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.useFakeTimers();
        const setTab = jest.fn();
        jest.spyOn(UseSetTab, "default").mockReturnValue(setTab);
        const screen = render(<WelcomeBackScreen />);
        expect(screen.getByText(translate("welcome_back")));
        jest.runAllTimers();
        expect(setTab).toHaveBeenCalledWith(AuthScreens.INTRODUCE_PIN);
        jest.useRealTimers();
    });
});
