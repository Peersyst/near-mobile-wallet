import { ActionMock } from "test-mocks";
import { EnhancedTransactionActionKind, TransactionActionKind } from "near-peersyst-sdk";
import { formatDate, render, screen, translate, waitFor } from "test-utils";
import ActionCard from "module/transaction/component/display/ActionCard/ActionCard";
import { config } from "config";
import { UseNativeTokenConversionMock } from "mocks/common/wallet/useNativeTokenConversion";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/utils/currencies";
import { ACTION_LABEL } from "module/wallet/component/display/Balance/utils/actionLabels";

describe("ActionCard test", () => {
    test("Test shows receive", async () => {
        new UseNativeTokenConversionMock({ value: "10" });
        const action = new ActionMock({ actionKind: EnhancedTransactionActionKind.TRANSFER_RECEIVE, deposit: "1" });
        render(<ActionCard action={action} />);
        // Label
        expect(screen.getByText(`${translate("from")} ${action.transaction.signerAccountId}`));
        // Amount
        expect(screen.getByText("+1 " + config.tokenName)).toBeDefined();
        // Date
        expect(screen.getByText(formatDate(Number(action.transaction.blockTimestamp)))).toBeDefined();
        // Fiat amount
        await waitFor(() => expect(screen.getByText(ACTION_LABEL["round"] + "10.00 " + CURRENCY_UNIT["usd"])).toBeDefined());
    });
    test("Test shows send", async () => {
        new UseNativeTokenConversionMock({ value: "10" });
        const action = new ActionMock({ actionKind: EnhancedTransactionActionKind.TRANSFER_SEND, deposit: "1" });
        render(<ActionCard action={action} />);
        // Label
        expect(screen.getByText(`${translate("send_to")} ${action.transaction.receiverAccountId}`));
        // Amount
        expect(screen.getByText("1 " + config.tokenName)).toBeDefined();
        // Date
        expect(screen.getByText(formatDate(Number(action.transaction.blockTimestamp)))).toBeDefined();
        // Fiat amount
        await waitFor(() => expect(screen.getByText(ACTION_LABEL["round"] + "10.00 " + CURRENCY_UNIT["usd"])).toBeDefined());
    });
    test("Test show smart contract", () => {
        const action = new ActionMock({ actionKind: TransactionActionKind.FUNCTION_CALL });
        render(<ActionCard action={action} />);
        // Label
        expect(
            screen.getByText(
                `${translate("called")} ${action.methodName} ${translate("method_in")} ${action.transaction.receiverAccountId}`,
            ),
        );
        // Date
        expect(screen.getByText(formatDate(Number(action.transaction.blockTimestamp)))).toBeDefined();
    });
});
