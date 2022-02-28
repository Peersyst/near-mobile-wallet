import { render } from "test-utils";
import LoginPage from "module/auth/page/LoginPage/LoginPage";
import { translate } from "locale";

describe("Test for the login Page", () => {
    test("Renders correctly", () => {
        const screen = render(<LoginPage />);
        //NumericPad test
        //Pin display
        expect(screen.getByText(translate("enter_your_pin")));
        //Keyboard
        expect(screen.getByText("1"));
        expect(screen.getByText("2"));
        expect(screen.getByText("3"));
    });
});
