import { render } from "test-utils";
import { Text } from "react-native";
import BaseWithBackgroundMainScreen from "module/main/component/layout/BaseWithBackgroundMainScreen/BaseWithBackgroundMainScreen";

describe("BaseWithBackgroundMainScreen tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <BaseWithBackgroundMainScreen>
                <Text>Content</Text>
            </BaseWithBackgroundMainScreen>,
        );
        expect(screen.getByText("Content")).toBeDefined();
    });
});
