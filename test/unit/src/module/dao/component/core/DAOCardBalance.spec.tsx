import DAOCardBalance from "module/dao/component/core/DAOAccountCard/DAOCardBalance/DAOCardBalance";
import { render, SuccessApiCall, translate } from "test-utils";
import { MockedDAOBalance } from "mocks/DAO";
import { waitFor } from "@testing-library/react-native";
import * as UseGetDaoInfo from "module/dao/query/useGetDaoInfo";
import daoInfo from "mocks/daoInfo";
import { UseGetServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("DAO Card balance test", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        const { state } = new UseWalletStateMock();
        const { serviceInstance } = new UseGetServiceInstanceMock();
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 12635,
        } as any);
        jest.spyOn(serviceInstance, "getDAOBalance").mockReturnValue(MockedDAOBalance as any);

        jest.spyOn(UseGetDaoInfo, "default").mockReturnValue({ data: daoInfo, isLoading: false } as any);

        const screen = render(<DAOCardBalance />);
        expect(screen.getByText(translate("wallet"))).toBeDefined();
        expect(screen.getByText(translate("available"))).toBeDefined();
        expect(screen.getByText(translate("locked"))).toBeDefined();
        expect(screen.getByText(translate("estimated_apc"))).toBeDefined();
        expect(screen.getByText(state.wallets[state.selectedWallet!].name)).toBeDefined();
        expect(screen.getAllByTestId("ActivityIndicator")).toHaveLength(2);

        await waitFor(() => expect(screen.getByText("12,635")).toBeDefined()); // Available

        await waitFor(() => expect(screen.getByText("500")).toBeDefined()); // Locked

        expect(screen.getByText(`${daoInfo.estimated_apc}%`)).toBeDefined(); // apc
    });
});
