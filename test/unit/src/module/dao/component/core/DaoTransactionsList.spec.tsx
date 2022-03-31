import * as GetDaoTransactions from "module/dao/mock/getDaoTransactions";
import { render, SuccessApiCall } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import { translate } from "locale";
import DaoTransactionsList from "module/dao/component/core/DaoTransactionsList/DaoTransactionList";
import { mockedDaoTransactions } from "mocks/daoTransaction";

describe("DAOTransactionsList tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly with tx", async () => {
        jest.spyOn(GetDaoTransactions, "default").mockReturnValue(SuccessApiCall(mockedDaoTransactions));
        const screen = render(<DaoTransactionsList />);
        await waitFor(() => expect(screen.getByText("01/01/2022 - 00:00")));
        expect(screen.getByText("02/01/2022 - 00:00"));
        expect(screen.getByText("03/01/2022 - 00:00"));
    });
    test("Renders correctly without transactions", async () => {
        jest.spyOn(GetDaoTransactions, "default").mockReturnValue(SuccessApiCall([]));
        const screen = render(<DaoTransactionsList />);
        await waitFor(() => expect(screen.getAllByText(translate("no_transactions"))));
    });
});
