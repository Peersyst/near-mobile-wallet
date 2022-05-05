import { render } from "test-utils";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import { TransactionType } from "ckb-peersyst-sdk";

describe("TransactionAmount tests", () => {
    test("Renders subtract", () => {
        const screen = render(<TransactionAmount amount={100} currency="CKB" type={TransactionType.SEND_CKB} variant="body1" />);
        expect(screen.getByText("-")).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.SEND_NFT} variant="body1" />);
        expect(screen.getByText("-")).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.SEND_TOKEN} variant="body1" />);
        expect(screen.getByText("-")).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.DEPOSIT_DAO} variant="body1" />);
        expect(screen.getByText("-")).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.SMART_CONTRACT_SEND} variant="body1" />);
        expect(screen.getByText("-")).toBeDefined();
    });

    test("Renders add", () => {
        const screen = render(<TransactionAmount amount={100} currency="CKB" type={TransactionType.RECEIVE_CKB} variant="body1" />);
        expect(screen.getByText("+")).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.RECEIVE_NFT} variant="body1" />);
        expect(screen.getByText("+")).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.RECEIVE_TOKEN} variant="body1" />);
        expect(screen.getByText("+")).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.SMART_CONTRACT_RECEIVE} variant="body1" />);
        expect(screen.getByText("+")).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.UNLOCK_DAO} variant="body1" />);
        expect(screen.getByText("+")).toBeDefined();
    });
    test("Renders display", () => {
        const screen = render(<TransactionAmount amount={100} currency="CKB" type={TransactionType.WITHDRAW_DAO} variant="body1" />);
        expect(screen.getByText("100").props.style.color).toEqual("rgb(0, 0, 0)");
    });
});
