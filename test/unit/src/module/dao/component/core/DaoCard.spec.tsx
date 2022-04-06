import { translate } from "locale";
import DaoCard from "module/dao/component/core/DaoAccountCard/DaoCard";
import { render, SuccessApiCall } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import { MockedDAOBalance } from "mocks/DAO";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";

describe("Test for the Dao Card", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getDaoBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        jest.spyOn(CkbServiceMock.prototype, "getCKBBalance").mockReturnValue(
            SuccessApiCall({ totalBalance: BigInt(20000), occupiedBalance: BigInt(9600), freeBalance: BigInt(12635) }),
        );
        const screen = render(<DaoCard />);
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
        /**Account Balance */
        await waitFor(() => expect(screen.getByText("12,635")).toBeDefined());
        expect(screen.getByText(translate("locked"))).toBeDefined();
        expect(screen.getByText("594")).toBeDefined();
        expect(screen.getByText("323")).toBeDefined();
        expect(screen.getByText(translate("current_apc"))).toBeDefined();
        expect(screen.getByText("2.4%")).toBeDefined();

        //Buttons
        expect(screen.getByText(translate("deposit"))).toBeDefined();
        expect(screen.getByTestId("DAODepositIcon")).toBeDefined();
        expect(screen.getByTestId("DAOWithdrawIcon")).toBeDefined();
        expect(screen.getByText(translate("withdraw"))).toBeDefined();

        //Header
        expect(screen.getByText("Nervos DAO"));
        expect(screen.getByTestId("FilledDAOIcon"));
        expect(screen.getByTestId("InfoIcon"));
    });
});
