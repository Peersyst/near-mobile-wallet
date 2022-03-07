import BaseAccountCard from "module/common/component/surface/BaseAccountCard/BaseAccountCard";
import { render } from "test-utils";
import { Text } from "react-native";

describe("BaseAccountCard test", () => {
    test("Renders correctly", () => {
        const screen = render(
            <BaseAccountCard>
                <Text>Hola</Text>
            </BaseAccountCard>,
        );
        expect(screen.getByText("Hola")).toBeDefined();
    });
});
