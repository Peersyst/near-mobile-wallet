import { render } from "test-utils";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import { TransactionType } from "ckb-peersyst-sdk";
import { config } from "config";

describe("TransactionAmount tests", () => {
    test("Renders add", () => {
        const screen = render(
            <TransactionAmount amount={100} currency="CKB" type={TransactionType.RECEIVE_NATIVE_TOKEN} variant="body1" />,
        );
        expect(screen.getByText("+ 100 " + config.tokenName)).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.RECEIVE_NFT} variant="body1" />);
        expect(screen.getByText("+ 100 " + config.tokenName)).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.RECEIVE_TOKEN} variant="body1" />);
        expect(screen.getByText("+ 100 " + config.tokenName)).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.SMART_CONTRACT_RECEIVE} variant="body1" />);
        expect(screen.getByText("+ 100 " + config.tokenName)).toBeDefined();
        screen.rerender(<TransactionAmount amount={100} currency="CKB" type={TransactionType.UNLOCK_DAO} variant="body1" />);
        expect(screen.getByText("+ 100 " + config.tokenName)).toBeDefined();
    });
});
