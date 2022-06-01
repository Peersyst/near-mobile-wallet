import { render } from "test-utils";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";
import { Text } from "react-native";
import { fireEvent } from "@testing-library/react-native";

describe("GlassNavigatorModal tests", () => {
    test("Renders correctly", () => {
        const screen = render(
            <GlassNavigatorModal navbar={{ title: "Title" }}>
                <Text>Content</Text>
            </GlassNavigatorModal>,
        );
        expect(screen.getByText("Title")).toBeDefined();
        expect(screen.getByText("Content")).toBeDefined();
    });

    test("Renders Back", () => {
        const screen = render(
            <GlassNavigatorModal navbar={{ title: "Title", back: true }}>
                <Text>Content</Text>
            </GlassNavigatorModal>,
        );
        expect(screen.getByTestId("BackIcon")).toBeDefined();
    });

    test("Calls onBack", () => {
        const handleBack = jest.fn();
        const screen = render(
            <GlassNavigatorModal navbar={{ title: "Title", back: true, onBack: handleBack }}>
                <Text>Content</Text>
            </GlassNavigatorModal>,
        );
        fireEvent.press(screen.getByTestId("BackIcon"));
        expect(handleBack).toHaveBeenCalled();
    });
});
