import { render } from "test-utils";
import { Text } from "react-native";
import BaseWalletCard from "module/common/component/surface/BaseWalletCard/BaseWalletCard";

describe("BaseWalletCard test", () => {
    test("Renders correctly", () => {
        const screen = render(
            <BaseWalletCard>
                <Text>Hola</Text>
            </BaseWalletCard>,
        );
        expect(screen.getByText("Hola")).toBeDefined();
    });
});
