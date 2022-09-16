import { render, translate } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import DAOCompletedWithdrawalsList from "module/dao/component/core/DAOCompletedWithdrawalsList/DAOCompletedWithdrawalsList";
import { mockedDAOUnlocks } from "mocks/DAOTransaction";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";

describe("DAOCompletedWithdrawalsList tests", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
    });

    test("Renders correctly with tx", async () => {
        jest.spyOn(sdkInstance, "getTransactions").mockReturnValue(mockedDAOUnlocks);
        const screen = render(<DAOCompletedWithdrawalsList />);
        await waitFor(() => expect(screen.getByText("10/01/2022 - 00:00")));
        expect(screen.getByText("11/01/2022 - 00:00"));
        expect(screen.getByText("12/01/2022 - 00:00"));
    });
    test("Renders correctly without transactions", async () => {
        jest.spyOn(sdkInstance, "getTransactions").mockReturnValue([]);
        const screen = render(<DAOCompletedWithdrawalsList />);
        await waitFor(() => expect(screen.getAllByText(translate("nothing_to_show"))));
    });
});
