import { MockedDaoBalance } from "mocks/dao";
import DaoScreen from "module/dao/screen/DaoScreen";
import { render, SuccessApiCall } from "test-utils";
import * as GetDaoBalance from "module/dao/mock/getDaoBalance";
import { translate } from "locale";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";

describe("Test for the DaoScreen", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(GetDaoBalance, "default").mockReturnValue(SuccessApiCall(MockedDaoBalance));
        const screen = render(<DaoScreen />);
        //Dao Card
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
    });
});
