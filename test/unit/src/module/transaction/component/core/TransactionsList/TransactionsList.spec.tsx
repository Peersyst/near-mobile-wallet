import * as UseWalletState from "module/wallet/hook/useWalletState";
import { transactions } from "mocks/transaction";
import { formatDate, render, translate } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import TransactionsList from "module/transaction/component/core/TransactionsList/TransactionsList";
import { mockedUseWallet } from "mocks/useWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import { Chains, NearSDKService } from "module/common/service/NearSdkService";

describe("TransactionsList tests", () => {
    var sdkInstance: NearSDKService;
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly with an account", async () => {
        sdkInstance = new NearSDKService(Chains.TESTNET, "", "", "secretKey", "Manolo", MnemonicMocked);
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });

        jest.spyOn(sdkInstance, "getTransactions").mockReturnValue(transactions as any);

        const screen = render(<TransactionsList />);
        await waitFor(() => expect(screen.getByText(formatDate(transactions[0].timestamp))));
        expect(screen.getByText(formatDate(transactions[1].timestamp)));
    });
    test("Renders correctly without transactions", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getTransactions").mockReturnValue([] as any);
        const screen = render(<TransactionsList />);
        await waitFor(() => expect(screen.getAllByText(translate("nothing_to_show", { ns: "error" }))));
    });
});
