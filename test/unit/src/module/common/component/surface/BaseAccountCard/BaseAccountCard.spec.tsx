import BaseAccountCard from "module/common/component/surface/BaseAccountCard/BaseAccountCard";
import { render } from "test-utils";
import { Dimensions, Text } from "react-native";

describe("BaseAccountCard test", () => {
    test("Renders correctly", () => {
        jest.spyOn(Dimensions, "get").mockReturnValue({
            width: 200,
            height: 200,
            scale: 2,
            fontScale: 200,
        });
        const screen = render(
            <BaseAccountCard>
                <Text>Hola</Text>
            </BaseAccountCard>,
        );
        expect(screen.getByText("Hola")).toBeDefined();
    });
});
