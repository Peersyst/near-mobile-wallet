import { render, screen, translate, waitFor } from "test-utils";
import ActionsList from "module/transaction/component/core/ActionsList/ActionsList";
import { ActionMock, UseGetActionsMock } from "test-mocks";
import { EnhancedTransactionActionKind } from "near-peersyst-sdk";

describe("Test for the acctions list component", () => {
    test("Renders correctly", async () => {
        const action = new ActionMock({ actionKind: EnhancedTransactionActionKind.TRANSFER_RECEIVE });
        new UseGetActionsMock({ actions: [action] });
        render(<ActionsList />);
        await waitFor(() => expect(screen.getByText(`${translate("from")} ${action.transaction.signerAccountId}`)));
    });

    test("Renders correctly without txs", async () => {
        new UseGetActionsMock({ actions: [] });
        render(<ActionsList />);
        await waitFor(() => expect(screen.getByText(translate("no_transactions", { ns: "error" }))));
    });
});
