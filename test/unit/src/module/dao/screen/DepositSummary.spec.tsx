import { formatHash } from "@peersyst/react-utils";
import DepositSummary from "module/dao/screen/DepositConfirmationScreen/DepositSummary";
import { render, SuccessApiCall, waitFor, translate } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { MockedDAOBalance } from "mocks/DAO";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import * as UseGetDaoInfo from "module/dao/query/useGetDaoInfo";
import daoInfo from "mocks/daoInfo";

describe("Test for the DepositSummary", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    beforeAll(() => {
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getDAOBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        jest.spyOn(sdkInstance, "getAddress").mockReturnValue("0xMockedAddress");
        jest.spyOn(UseGetDaoInfo, "default").mockReturnValue({ data: daoInfo, isLoading: false } as any);
        const screen = render(<DepositSummary senderAddress={"0xMockedAddress"} amount={1000} fee={"0.001"} senderName={"Peersyst"} />);
        expect(screen.getByText("1,000")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("001")).toBeDefined();
        expect(screen.getByText("0")).toBeDefined();
        //Sender
        expect(screen.getByText(translate("from") + ":"));
        expect(screen.getByText("Peersyst" + " - " + formatHash("0xMockedAddress", "middle", 3))).toBeDefined();
        //APC
        expect(screen.getByText(translate("estimated_apc") + ":"));
        await waitFor(() => expect(screen.getByText(`${daoInfo.estimated_apc}%`)).toBeDefined());
        //Warning text
        expect(screen.getByText(translate("deposit_summary_warning")));
    });
});
