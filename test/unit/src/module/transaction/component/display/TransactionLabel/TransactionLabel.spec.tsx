import { render } from "test-utils";
import TransactionLabel from "module/transaction/component/display/TransactionLabel/TransactionLabel";
import { TransactionType } from "@peersyst/ckb-peersyst-sdk";
import { translate } from "locale";

describe("TransactionLabel tests", () => {
    test("Renders correctly", () => {
        const screen = render(<TransactionLabel type={TransactionType.RECEIVE_CKB} variant="body1" />);

        expect(screen.getByText(translate("received"))).toBeDefined();
    });
});
