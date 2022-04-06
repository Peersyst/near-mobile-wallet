import { render, SuccessApiCall } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import { translate } from "locale";
import { mockedDAOTransactions } from "mocks/DAOTransaction";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import DAODepositsList from "module/dao/component/core/DAODepositsList/DAODepositsList";

describe("DAODepositsList tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
    });

    test("Renders correctly with tx", async () => {
        jest.spyOn(CkbServiceMock.prototype, "getTransactions").mockReturnValue(SuccessApiCall(mockedDAOTransactions));
        const screen = render(<DAODepositsList />);
        await waitFor(() => expect(screen.getByText("01/01/2022 - 00:00")));
        expect(screen.getByText("02/01/2022 - 00:00"));
        expect(screen.getByText("03/01/2022 - 00:00"));
    });
    test("Renders correctly without transactions", async () => {
        jest.spyOn(CkbServiceMock.prototype, "getTransactions").mockReturnValue(SuccessApiCall([]));
        const screen = render(<DAODepositsList />);
        await waitFor(() => expect(screen.getAllByText(translate("no_transactions"))));
    });
});
