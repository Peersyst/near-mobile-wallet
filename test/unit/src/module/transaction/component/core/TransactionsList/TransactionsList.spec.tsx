import { transactions } from "mocks/transaction";
import { formatDate, render, translate } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import TransactionsList from "module/transaction/component/core/TransactionsList/TransactionsList";
import { UseGetServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("TransactionsList tests", () => {
    new UseWalletStateMock();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly with an account", async () => {
        const { serviceInstance } = new UseGetServiceInstanceMock();
        jest.spyOn(serviceInstance, "getTransactions").mockReturnValue(transactions as any);
        const screen = render(<TransactionsList />);
        await waitFor(() => expect(screen.getByText(formatDate(transactions[0].timestamp))).toBeDefined());
        expect(screen.getByText(formatDate(transactions[1].timestamp)));
    });
    test("Renders correctly without transactions", async () => {
        const { serviceInstance } = new UseGetServiceInstanceMock();
        const screen = render(<TransactionsList />);
        jest.spyOn(serviceInstance, "getTransactions").mockReturnValue([] as any);
        await waitFor(() => expect(screen.getAllByText(translate("nothing_to_show", { ns: "error" }))));
    });
});
