import { MockedDAOBalance } from "mocks/DAO";
import DAOScreen from "module/dao/screen/DAOScreen";
import { render, SuccessApiCall, translate } from "test-utils";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("Test for the DAOScreen", () => {
    test("Renders correctly", async () => {
        new UseWalletStateMock();
        const { serviceInstance } = new UseServiceInstanceMock();
        jest.spyOn(serviceInstance, "getTransactions").mockReturnValue([]);
        jest.spyOn(serviceInstance, "getDAOBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        const screen = render(<DAOScreen />);
        //DAO Card
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
    });
});
