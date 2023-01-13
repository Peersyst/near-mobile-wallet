import { config } from "config";
import Fee from "module/transaction/component/display/Fee/Fee";
import { render, screen, translate } from "test-utils";

describe("Test for the Fee", () => {
    test("Render correctly", () => {
        render(<Fee tag="body2" />);
        expect(screen.getByText(translate("transaction_fee_label") + " · ")).toBeDefined();
        expect(screen.getByText(config.estimatedFee + " " + config.tokenName)).toBeDefined();
    });
});
