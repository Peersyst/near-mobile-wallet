import AccountCard from "module/common/component/surface/AccountCard/AccountCard";
import { render } from "test-utils";
import { Text } from "react-native";

describe("Account card test", () => {
    test("Renders correctly", () => {
        const screen = render(
            <AccountCard>
                <Text>Hola</Text>
            </AccountCard>,
        );
        expect(screen.getByText("Hola")).toBeDefined();
    });
});
