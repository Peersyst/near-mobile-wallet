import { render } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import { translate } from "locale";
import { mockedDAODeposits } from "mocks/DAOTransaction";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import DAODepositsList from "module/dao/component/core/DAODepositsList/DAODepositsList";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/common/query/useLoad";

describe("DAODepositsList tests", () => {
    const sdkInstance = new CKBSDKService("");

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
    });

    test("Renders correctly with tx", async () => {
        jest.spyOn(sdkInstance, "getTransactions").mockReturnValue(mockedDAODeposits);
        const screen = render(<DAODepositsList />);
        await waitFor(() => expect(screen.getByText("01/01/2022 - 00:00")));
        expect(screen.getByText("02/01/2022 - 00:00"));
        expect(screen.getByText("03/01/2022 - 00:00"));
    });
    test("Renders correctly without transactions", async () => {
        jest.spyOn(sdkInstance, "getTransactions").mockReturnValue([]);
        const screen = render(<DAODepositsList />);
        await waitFor(() => expect(screen.getAllByText(translate("no_deposits"))));
    });
});
