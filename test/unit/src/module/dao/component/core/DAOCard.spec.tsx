import DAOCard from "module/dao/component/core/DAOAccountCard/DAOCard";
import { render, SuccessApiCall, translate } from "test-utils";
import { MockedDAOBalance } from "mocks/DAO";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import * as UseGetDaoInfo from "module/dao/query/useGetDaoInfo";
import daoInfo from "mocks/daoInfo";

describe("Test for the DAO Card", () => {
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

        const screen = render(<DAOCard />);
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
        /**Account Balance */
        expect(await screen.findByText("12,635")).toBeDefined();
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
