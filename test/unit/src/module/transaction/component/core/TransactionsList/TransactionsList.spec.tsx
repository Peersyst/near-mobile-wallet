import * as UseWallet from "module/wallet/hook/useWallet";
import * as GetTransactions from "module/transaction/mock/getTransactions";
import { transactions } from "mocks/transaction";
import { render, SuccessApiCall } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import TransactionsList from "module/transaction/component/core/TransactionsList/TransactionsList";
import { translate } from "locale";
import { mockedUseWallet } from "mocks/useWallet";

describe("TransactionsList tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly with an account", async () => {
        jest.spyOn(UseWallet, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(GetTransactions, "default").mockReturnValue(SuccessApiCall(transactions));

        const screen = render(<TransactionsList />);
        await waitFor(() => expect(screen.getByText("01/01/2022 - 00:00")));
        expect(screen.getByText("02/01/2022 - 00:00"));
        expect(screen.getByText("03/01/2022 - 00:00"));
    });
    test("Renders correctly without transactions", async () => {
        jest.spyOn(UseWallet, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(GetTransactions, "default").mockReturnValue(SuccessApiCall([]));
        const screen = render(<TransactionsList />);
        await waitFor(() => expect(screen.getAllByText(translate("no_transactions"))));
    });
});
