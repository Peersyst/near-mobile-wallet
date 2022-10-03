import { render, translate } from "test-utils";
import TransactionDetailsModal from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsModal";
import { receivedTransaction, sentTransaction } from "mocks/transaction";
import { formatHash } from "@peersyst/react-utils";
import { TX_LABEL } from "module/transaction/component/display/TransactionLabel/utils/TX_LABEL";
import getTransactionAmountUtils from "module/transaction/component/display/TransactionAmount/utils/getTransactionAmountUtils";
import { config } from "config";
import { ACTION_LABEL } from "module/wallet/component/display/Balance/utils/actionLabels";

describe("TransactionDetailsModal test", () => {
    test("Renders Send correctly", () => {
        const { action } = getTransactionAmountUtils(sentTransaction.type) || {};
        const screen = render(<TransactionDetailsModal transaction={sentTransaction} />);
        //Header
        expect(screen.getByTestId("ArrowUpCircleIcon")).toBeDefined();
        expect(screen.getByText(translate(TX_LABEL[sentTransaction.type]))).toBeDefined();
        expect(screen.getByText(ACTION_LABEL[action!] + sentTransaction.amount + " " + config.tokenName)).toBeDefined();
        //Body
        expect(screen.getByText(translate("receiver"))).toBeDefined();
        expect(screen.getByText(formatHash(sentTransaction.outputs[0].address, "middle", 8))).toBeDefined();
        expect(screen.getByText(translate("hash"))).toBeDefined();
        expect(screen.getByText(sentTransaction.transactionHash)).toBeDefined();
    });

    test("Renders Receive correctly", () => {
        const { action } = getTransactionAmountUtils(receivedTransaction.type) || {};
        const screen = render(<TransactionDetailsModal transaction={receivedTransaction} />);
        //HEADER
        expect(screen.getByTestId("ArrowDownCircleIcon")).toBeDefined();
        expect(screen.getByText(translate(TX_LABEL[receivedTransaction.type]))).toBeDefined();
        expect(screen.getByText(ACTION_LABEL[action!] + receivedTransaction.amount + " " + config.tokenName)).toBeDefined();
        //BODY
        expect(screen.getByText(translate("hash"))).toBeDefined();
        expect(screen.getByText(receivedTransaction.transactionHash)).toBeDefined();
    });
});
