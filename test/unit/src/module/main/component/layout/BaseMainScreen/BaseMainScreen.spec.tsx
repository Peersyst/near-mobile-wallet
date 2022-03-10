import { render } from "test-utils";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { Text } from "react-native";

describe("BaseMainScreen tests", () => {
    test("Renders correctly with navbar", () => {
        const screen = render(
            <BaseMainScreen title="Title" back={true}>
                <Text>Content</Text>
            </BaseMainScreen>,
        );

        expect(screen.getByText("Title")).toBeDefined();
        expect(screen.getByTestId("BackIcon")).toBeDefined();
        expect(screen.getByText("Content")).toBeDefined();
    });
});
