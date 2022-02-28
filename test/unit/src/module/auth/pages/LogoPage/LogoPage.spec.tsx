import LogoPage from "module/auth/page/LogoPage/LogoPage";
import { render } from "test-utils";
import { Text } from "react-native";

describe("Logo page test", () => {
    test("Renders correctly", () => {
        const screen = render(
            <LogoPage>
                <Text>Hello</Text>
            </LogoPage>,
        );
        expect(screen.getByText("Hello")).toBeDefined();
        expect(screen.getByTestId("LogoColIcon")).toBeDefined();
    });
});
