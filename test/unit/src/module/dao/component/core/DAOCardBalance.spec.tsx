import DAOCardBalance from "module/dao/component/core/DAOAccountCard/DAOCardBalance/DAOCardBalance";
import { render, SuccessApiCall, translate } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { MockedDAOBalance } from "mocks/DAO";
import { waitFor } from "@testing-library/react-native";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import * as UseGetDaoInfo from "module/dao/query/useGetDaoInfo";
import daoInfo from "mocks/daoInfo";

describe("DAO Card balance test", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getDAOBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        jest.spyOn(sdkInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 12635,
        });
        jest.spyOn(UseGetDaoInfo, "default").mockReturnValue({ data: daoInfo, isLoading: false } as any);

        const screen = render(<DAOCardBalance />);
        expect(screen.getByText(translate("wallet"))).toBeDefined();
        expect(screen.getByText(translate("available"))).toBeDefined();
        expect(screen.getByText(translate("locked"))).toBeDefined();
        expect(screen.getByText(translate("estimated_apc"))).toBeDefined();
        expect(screen.getByText(mockedUseWallet.state.wallets[mockedUseWallet.state.selectedWallet!].name)).toBeDefined();
        expect(screen.getAllByTestId("ActivityIndicator")).toHaveLength(2);
        await waitFor(() => expect(screen.getByText("12,635")).toBeDefined()); // Available

        await waitFor(() => expect(screen.getByText("500")).toBeDefined()); // Locked

        expect(screen.getByText(`${daoInfo.estimated_apc}%`)).toBeDefined(); // apc
    });
});
