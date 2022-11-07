import DAOCard from "module/dao/component/core/DAOAccountCard/DAOCard";
import { render, SuccessApiCall, translate } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import { MockedDAOBalance } from "mocks/DAO";
import * as UseGetDaoInfo from "module/dao/query/useGetDaoInfo";
import daoInfo from "mocks/daoInfo";
import { UseGetServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("Test for the DAO Card", () => {
    const { serviceInstance } = new UseGetServiceInstanceMock();
    new UseWalletStateMock();
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 12635,
        });
        jest.spyOn(serviceInstance, "getDAOBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        jest.spyOn(UseGetDaoInfo, "default").mockReturnValue({ data: daoInfo, isLoading: false } as any);

        const screen = render(<DAOCard />);
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
        /**Account Balance */
        //This is 3 because of card + 2 of the modal
        await waitFor(() => expect(screen.getAllByText("12,635")).toHaveLength(3));
        expect(screen.getByText(translate("locked"))).toBeDefined();
        expect(screen.getByText("500")).toBeDefined();
        expect(screen.getByText(translate("estimated_apc"))).toBeDefined();
        expect(screen.getByText(`${daoInfo.estimated_apc}%`)).toBeDefined();

        //Buttons
        expect(screen.getByText(translate("deposit"))).toBeDefined();
        expect(screen.getByTestId("DAODepositIcon")).toBeDefined();
        expect(screen.getByTestId("DAOWithdrawIcon")).toBeDefined();
        expect(screen.getByText(translate("withdraw"))).toBeDefined();

        //Header
        expect(screen.getByText("Nervos DAO"));
        expect(screen.getByTestId("FilledWalletIcon"));
        expect(screen.getByTestId("InfoIcon"));
    });
});
