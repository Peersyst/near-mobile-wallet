import * as UseWalletState from "module/wallet/hook/useWalletState";
import { transactions } from "mocks/transaction";
import { render, SuccessApiCall } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import TransactionsList from "module/transaction/component/core/TransactionsList/TransactionsList";
import { translate } from "locale";
import { mockedUseWallet } from "mocks/useWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";

describe("TransactionsList tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly with an account", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CKBSDKService.prototype, "getTransactions").mockReturnValue(SuccessApiCall(transactions));

        const screen = render(<TransactionsList />);
        await waitFor(() => expect(screen.getByText("01/01/2022 - 00:00")));
        expect(screen.getByText("02/01/2022 - 00:00"));
        expect(screen.getByText("03/01/2022 - 00:00"));
    });
    test("Renders correctly without transactions", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CKBSDKService.prototype, "getTransactions").mockReturnValue(SuccessApiCall([]));
        const screen = render(<TransactionsList />);
        await waitFor(() => expect(screen.getAllByText(translate("no_transactions"))));
    });
});
