import { render, SuccessApiCall } from "test-utils";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import DAOTabs from "module/dao/navigation/DAOTabs/DAOTabs";
import { mockedDAODeposits, mockedDAOUnlocks } from "mocks/DAOTransaction";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";

describe("DAOTabs tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly with deposits", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getTransactions").mockReturnValue(SuccessApiCall(mockedDAODeposits));
        const screen = render(<DAOTabs />);
        await waitFor(() => expect(screen.getByText("01/01/2022 - 00:00")));
        expect(screen.getByText(translate("deposits"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("completed")));
        await waitFor(() => expect(screen.getAllByText(translate("no_withdrawals"))));
    });
    test("Renders correctly with completed withdrawals", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getTransactions").mockReturnValue(SuccessApiCall(mockedDAOUnlocks));
        const screen = render(<DAOTabs />);
        await waitFor(() => expect(screen.getAllByText(translate("no_deposits"))));
        expect(screen.getByText(translate("deposits"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("completed")));
        await waitFor(() => expect(screen.getByText("10/01/2022 - 00:00")));
    });
});
