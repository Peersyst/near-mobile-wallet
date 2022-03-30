import { render } from "test-utils";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { transaction } from "mocks/transaction";
import { ReceiveIcon } from "icons";

describe("TransactionCard tests", () => {
    test("Renders correctly", () => {
        const screen = render(<TransactionCard TxIcon={<ReceiveIcon />} label={"Info"} units={"ckb"} {...transaction} />);
        expect(screen.getByText("29/01/2022 - 00:00")).toBeDefined();
        expect(screen.getByText("Info")).toBeDefined();
        expect(screen.getByText("ckb")).toBeDefined();
    });
});
