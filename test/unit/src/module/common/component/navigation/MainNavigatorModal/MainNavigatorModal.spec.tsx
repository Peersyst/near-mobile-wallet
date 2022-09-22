import { render } from "test-utils";
import MainNavigatorModal from "module/common/component/navigation/MainNavigatorModal/MainNavigatorModal";
import { Text } from "react-native";
import { fireEvent } from "@testing-library/react-native";

describe("MainNavigatorModal tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <MainNavigatorModal navbar={{ title: "Title" }}>
                <Text>Content</Text>
            </MainNavigatorModal>,
        );
        expect(screen.getByText("Title")).toBeDefined();
        expect(screen.getByText("Content")).toBeDefined();
    });

    test("Renders Back", () => {
        const screen = render(
            <MainNavigatorModal navbar={{ title: "Title", back: true }}>
                <Text>Content</Text>
            </MainNavigatorModal>,
        );
        expect(screen.getByTestId("BackIcon")).toBeDefined();
    });

    test("Calls onBack", () => {
        const handleBack = jest.fn();
        const screen = render(
            <MainNavigatorModal navbar={{ title: "Title", back: true, onBack: handleBack }}>
                <Text>Content</Text>
            </MainNavigatorModal>,
        );
        fireEvent.press(screen.getByTestId("BackIcon"));
        expect(handleBack).toHaveBeenCalled();
    });
});
