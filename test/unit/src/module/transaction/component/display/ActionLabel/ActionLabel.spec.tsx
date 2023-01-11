import ActionLabel from "module/transaction/component/display/ActionLabel/ActionLabel";
import { EnhancedTransactionActionKind, TransactionActionKind } from "near-peersyst-sdk";
import { ActionMock } from "test-mocks";
import { render, screen, translate } from "test-utils";

describe("Action label test", () => {
    test("Test sends", () => {
        const action = new ActionMock({ actionKind: EnhancedTransactionActionKind.TRANSFER_SEND });
        render(<ActionLabel action={action} variant={"h1Strong"} />);
        expect(screen.getByText(`${translate("send_to")} ${action.transaction.receiverAccountId}`));
    });
    test("Test receive", () => {
        const action = new ActionMock({ actionKind: EnhancedTransactionActionKind.TRANSFER_RECEIVE });
        render(<ActionLabel action={action} variant={"h1Strong"} />);
        expect(screen.getByText(`${translate("from")} ${action.transaction.signerAccountId}`));
    });
    test("Test create account", () => {
        const action = new ActionMock({ actionKind: TransactionActionKind.CREATE_ACCOUNT });
        render(<ActionLabel action={action} variant={"h1Strong"} />);
        expect(screen.getByText(`${translate("new_account_created")}: ${action.transaction.receiverAccountId}`));
    });
    test("Smart contract", () => {
        const action = new ActionMock({ actionKind: TransactionActionKind.FUNCTION_CALL });
        render(<ActionLabel action={action} variant={"h1Strong"} />);
        expect(
            screen.getByText(
                `${translate("called")} ${action.methodName} ${translate("method_in")} ${action.transaction.receiverAccountId}`,
            ),
        );
    });
});
