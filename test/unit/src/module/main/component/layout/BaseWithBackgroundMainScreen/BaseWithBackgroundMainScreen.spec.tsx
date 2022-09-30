import { render } from "test-utils";
import { Text } from "react-native";
import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";

describe("BaseWithBackgroundMainScreen tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <BaseMainGradientScreen>
                <Text>Content</Text>
            </BaseMainGradientScreen>,
        );
        expect(screen.getByText("Content")).toBeDefined();
    });
});
