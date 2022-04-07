import { MockedDAOBalance } from "mocks/DAO";
import DAOScreen from "module/dao/screen/DAOScreen";
import { render, SuccessApiCall } from "test-utils";
import { translate } from "locale";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";

describe("Test for the DAOScreen", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CKBSDKService.prototype, "getTransactions").mockReturnValue(SuccessApiCall([]));
        jest.spyOn(CKBSDKService.prototype, "getDAOBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        const screen = render(<DAOScreen />);
        //DAO Card
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
    });
});
