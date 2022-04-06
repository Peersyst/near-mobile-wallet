import { MockedDAOBalance } from "mocks/DAO";
import DaoScreen from "module/dao/screen/DaoScreen";
import { render, SuccessApiCall } from "test-utils";
import { translate } from "locale";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

describe("Test for the DaoScreen", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getTransactions").mockReturnValue(SuccessApiCall([]));
        jest.spyOn(CkbServiceMock.prototype, "getDaoBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        const screen = render(<DaoScreen />);
        //Dao Card
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
    });
});
