import SendTxHashContent from "module/transaction/component/feedback/SendTransactionModal/SendTxHashContent";
import { render, screen, translate } from "test-utils";

describe("SendTxHashContent test", () => {
    test("Renders correctly", () => {
        const mockedTxHash = "0xTx";
        render(<SendTxHashContent txHash={mockedTxHash} />);
        expect(screen.getByText(translate("transaction"))).toBeDefined();
        //Tx hash
        expect(screen.getByText(mockedTxHash)).toBeDefined();
        //Share button
        expect(screen.getByRole("button", { name: translate("share") })).toBeDefined();
        //Explorer button
        expect(screen.getByRole("button", { name: translate("seeInExplorer") })).toBeDefined();
    });
});
