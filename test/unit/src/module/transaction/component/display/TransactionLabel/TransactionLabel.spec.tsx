import { render, translate } from "test-utils";
import TransactionLabel from "module/transaction/component/display/TransactionLabel/TransactionLabel";
import { TransactionType } from "near-peersyst-sdk";
import { TX_LABEL } from "module/transaction/component/display/TransactionLabel/utils/txLabel";

describe("TransactionLabel tests", () => {
    test("Renders correctly", () => {
        const type = TransactionType.RECEIVE_NATIVE_TOKEN;
        const screen = render(<TransactionLabel type={type} variant="body1" />);

        expect(screen.getByText(translate(TX_LABEL[type]))).toBeDefined();
    });
});
