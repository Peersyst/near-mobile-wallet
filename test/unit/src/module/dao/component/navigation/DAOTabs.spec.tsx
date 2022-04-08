import { render } from "test-utils";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import DAOTabs from "module/dao/navigation/DAOTabs/DAOTabs";
import { mockedDAODeposits, mockedDAOUnlocks } from "mocks/DAOTransaction";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/common/query/useLoad";

describe("DAOTabs tests", () => {
    const sdkInstance = new CKBSDKService("");

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly with deposits", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(sdkInstance, "getTransactions").mockReturnValue(mockedDAODeposits);
        const screen = render(<DAOTabs />);
        await waitFor(() => expect(screen.getByText("01/01/2022 - 00:00")));
        expect(screen.getByText(translate("deposits"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("completed")));
        await waitFor(() => expect(screen.getAllByText(translate("no_withdrawals"))));
    });
    test("Renders correctly with completed withdrawals", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(sdkInstance, "getTransactions").mockReturnValue(mockedDAOUnlocks);
        const screen = render(<DAOTabs />);
        await waitFor(() => expect(screen.getAllByText(translate("no_deposits"))));
        expect(screen.getByText(translate("deposits"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("completed")));
        await waitFor(() => expect(screen.getByText("10/01/2022 - 00:00")));
    });
});
