import { translate } from "locale";
import DAOCardBalance from "module/dao/component/core/DAOAccountCard/DAOCardBalance/DAOCardBalance";
import { render, SuccessApiCall } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { MockedDAOBalance } from "mocks/DAO";
import { waitFor } from "@testing-library/react-native";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/common/query/useLoad";

describe("DAO Card balance test", () => {
    const sdkInstance = new CKBSDKService("");

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(sdkInstance, "getDAOBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        jest.spyOn(sdkInstance, "getCKBBalance").mockReturnValue({
            totalBalance: BigInt(20000),
            occupiedBalance: BigInt(9600),
            freeBalance: BigInt(12635),
        });

        const screen = render(<DAOCardBalance />);
        expect(screen.getByText(translate("wallet"))).toBeDefined();
        expect(screen.getByText(translate("available"))).toBeDefined();
        expect(screen.getByText(translate("locked"))).toBeDefined();
        expect(screen.getByText(translate("current_apc"))).toBeDefined();
        expect(screen.getByText(mockedUseWallet.state.wallets[mockedUseWallet.state.selectedWallet!].name)).toBeDefined();
        expect(screen.getAllByTestId("actIndicator")).toHaveLength(3);
        await waitFor(() => expect(screen.getByText("12,635")).toBeDefined()); // Available
        await waitFor(() => expect(screen.getByText("500")).toBeDefined()); // Locked
        expect(screen.getByText("100%")).toBeDefined(); // apc
    });
});
