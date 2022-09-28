import { render } from "test-utils";
import BaseWalletCard from "module/common/component/surface/BaseWalletCard/BaseWalletCard";
import { Text } from "react-native";

describe("BaseWalletCard test", () => {
    test("Renders correctly", () => {
        const screen = render(
            <BaseWalletCard name="WalletName">
                {{
                    Buttons: (
                        <>
                            <Text>Buttons</Text>
                        </>
                    ),
                    Balance: (
                        <>
                            <Text>Balance</Text>
                        </>
                    ),
                }}
            </BaseWalletCard>,
        );
        screen.debug();
        expect(screen.getByText("WalletName")).toBeDefined();
        expect(screen.getByText("Buttons")).toBeDefined();
        expect(screen.getByText("Balance")).toBeDefined();
    });
});
