import { render } from "test-utils";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import { TransactionType } from "ckb-peersyst-sdk";
import { config } from "config";
import { ACTION_LABEL } from "module/wallet/component/display/Balance/utils/actionLabels";

describe("TransactionAmount tests", () => {
    test("Renders add", () => {
        const screen = render(
            <TransactionAmount balance={100} units="token" type={TransactionType.RECEIVE_NATIVE_TOKEN} variant="body1" />,
        );
        expect(screen.getByText(ACTION_LABEL["add"] + "100 " + config.tokenName)).toBeDefined();
        screen.rerender(<TransactionAmount balance={100} units="token" type={TransactionType.RECEIVE_NFT} variant="body1" />);
        expect(screen.getByText(ACTION_LABEL["add"] + "100 " + config.tokenName)).toBeDefined();
        screen.rerender(<TransactionAmount balance={100} units="token" type={TransactionType.RECEIVE_TOKEN} variant="body1" />);
        expect(screen.getByText(ACTION_LABEL["add"] + "100 " + config.tokenName)).toBeDefined();
        screen.rerender(<TransactionAmount balance={100} units="token" type={TransactionType.SMART_CONTRACT_RECEIVE} variant="body1" />);
        expect(screen.getByText(ACTION_LABEL["add"] + "100 " + config.tokenName)).toBeDefined();
    });
    test("Renders display", () => {
        const screen = render(<TransactionAmount balance={100} units="token" type={TransactionType.SEND_NATIVE_TOKEN} variant="body1" />);
        expect(screen.getByText("100 " + config.tokenName)).toBeDefined();
        screen.rerender(<TransactionAmount balance={100} units="token" type={TransactionType.SEND_TOKEN} variant="body1" />);
        expect(screen.getByText("100 " + config.tokenName)).toBeDefined();
        screen.rerender(<TransactionAmount balance={100} units="token" type={TransactionType.SMART_CONTRACT_SEND} variant="body1" />);
        expect(screen.getByText("100 " + config.tokenName)).toBeDefined();
    });
});
