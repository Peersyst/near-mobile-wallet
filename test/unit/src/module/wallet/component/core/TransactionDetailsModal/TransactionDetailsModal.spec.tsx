import { render } from "test-utils";
import TransactionDetailsModal from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsModal";
import { createTransaction, receivedTransaction, sentTransaction } from "mocks/transaction";
import { translate } from "locale";
import { formatHash } from "@peersyst/react-utils";
import { TransactionType } from "ckb-peersyst-sdk";

describe("TransactionDetailsModal test", () => {
    test("Renders SEND_CKB correctly", () => {
        const screen = render(<TransactionDetailsModal transaction={sentTransaction} />);
        expect(screen.getByTestId("SendIcon")).toBeDefined();
        expect(screen.getByText(translate("sent"))).toBeDefined();
        expect(screen.getByText(translate("receiver"))).toBeDefined();
        expect(screen.getByText(formatHash(sentTransaction.outputs[0].address, "middle", 8))).toBeDefined();
        expect(screen.getByText(translate("hash"))).toBeDefined();
        expect(screen.getByText(sentTransaction.transactionHash)).toBeDefined();
    });

    test("Renders RECEIVE_CKB correctly", () => {
        const screen = render(<TransactionDetailsModal transaction={receivedTransaction} />);
        expect(screen.getByTestId("ReceiveIcon")).toBeDefined();
        expect(screen.getByText(translate("received"))).toBeDefined();
        expect(screen.getByText(translate("senders"))).toBeDefined();
        expect(screen.getByText(formatHash(receivedTransaction.inputs[0].address, "middle", 6))).toBeDefined();
        expect(screen.getByText(formatHash(receivedTransaction.inputs[1].address, "middle", 6))).toBeDefined();
        expect(screen.getByText(formatHash(receivedTransaction.inputs[2].address, "middle", 6))).toBeDefined();
        expect(screen.getByText(translate("hash"))).toBeDefined();
        expect(screen.getByText(receivedTransaction.transactionHash)).toBeDefined();
    });

    test("Renders SEND_NFT correctly", () => {
        const screen = render(<TransactionDetailsModal transaction={createTransaction({ type: TransactionType.SEND_NFT })} />);
        expect(screen.getByTestId("SendIcon")).toBeDefined();
        expect(screen.getByText(translate("sent_nft"))).toBeDefined();
        expect(screen.getByText(translate("hash"))).toBeDefined();
        expect(screen.getByText(receivedTransaction.transactionHash)).toBeDefined();
    });
});
