import { translate } from "locale";
import DaoCard from "module/dao/component/core/DaoAccountCard/DaoCard";
import { render, SuccessApiCall } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import * as GetDaoBalance from "module/dao/mock/getDaoBalance";
import { MockedDaoBalance } from "mocks/dao";

describe("Test for the Dao Card", () => {
    test("Renders correctly", async () => {
        jest.spyOn(GetDaoBalance, "default").mockReturnValue(SuccessApiCall(MockedDaoBalance));
        const screen = render(<DaoCard />);
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
        /**Account Balance */
        await waitFor(() => expect(screen.getByText("12,635")).toBeDefined());
        expect(screen.getByText("304223")).toBeDefined();
        expect(screen.getByText(translate("locked"))).toBeDefined();
        expect(screen.getByText("594")).toBeDefined();
        expect(screen.getByText("323")).toBeDefined();
        expect(screen.getByText(translate("current_apc"))).toBeDefined();
        expect(screen.getByText("2.4%")).toBeDefined();

        //Buttons
        expect(screen.getByText(translate("deposit"))).toBeDefined();
        expect(screen.getByTestId("DAODepositIcon")).toBeDefined();
        expect(screen.getByTestId("DAOWithdrawIcon")).toBeDefined();
        expect(screen.getByText(translate("withdraw"))).toBeDefined();

        //Header
        expect(screen.getByText("Nervos DAO"));
        expect(screen.getByTestId("FilledDAOIcon"));
        expect(screen.getByTestId("InfoIcon"));
    });
});
