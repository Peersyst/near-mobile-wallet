import { render } from "test-utils";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { createTransaction, transaction } from "mocks/transaction";
import { translate } from "locale";
import { TransactionType } from "module/transaction/types";

describe("TransactionCard tests", () => {
    test("Renders correctly with amount", () => {
        const screen = render(<TransactionCard transaction={transaction} />);
        expect(screen.getByText("29/01/2022 - 00:00")).toBeDefined();
        expect(screen.getByText(translate("sent"))).toBeDefined();
        expect(screen.getByText("CKB")).toBeDefined();
        expect(screen.getByTestId("SendIcon")).toBeDefined();
    });

    test("Renders correctly without amount", () => {
        const screen = render(<TransactionCard transaction={createTransaction({ type: TransactionType.SMART_CONTRACT })} />);
        expect(screen.getByText("29/01/2022 - 00:00")).toBeDefined();
        expect(screen.getByText(translate("smart_contract"))).toBeDefined();
        expect(screen.queryByText("CKB")).toBeNull();
        expect(screen.getByTestId("SmartContractIcon")).toBeDefined();
    });
});
