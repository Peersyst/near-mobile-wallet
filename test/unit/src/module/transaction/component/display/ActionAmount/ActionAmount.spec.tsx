import { config } from "config";
import ActionAmount from "module/transaction/component/display/ActionAmount/ActionAmount";
import { EnhancedTransactionActionKind } from "near-peersyst-sdk";
import { render, screen } from "test-utils";

describe("ActionAmount", () => {
    test("Renders with add", () => {
        render(
            <ActionAmount units="token" actionKind={EnhancedTransactionActionKind.TRANSFER_RECEIVE} amount={"1"} variant={"h1Strong"} />,
        );
        expect(screen.getByText("+1 " + config.tokenName)).toBeDefined();
    });

    test("Renders with display", () => {
        render(<ActionAmount units="token" actionKind={EnhancedTransactionActionKind.TRANSFER_SEND} amount={"1"} variant={"h1Strong"} />);
        expect(screen.getByText("1 " + config.tokenName)).toBeDefined();
    });
});
