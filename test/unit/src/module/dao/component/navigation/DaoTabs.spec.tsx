import { render, SuccessApiCall } from "test-utils";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import DaoTabs from "module/dao/navigation/DaoTabs/DaoTabs";
import { mockedDaoTransactions } from "mocks/DAOTransaction";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";

describe("DaoTabs tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getTransactions").mockReturnValue(SuccessApiCall(mockedDaoTransactions));
        const screen = render(<DaoTabs />);
        await waitFor(() => expect(screen.getByText("01/01/2022 - 00:00")));
        expect(screen.getByText(translate("deposits"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("completed")));
        expect(screen.getByText("DaoTab2")).toBeDefined();
    });
});
