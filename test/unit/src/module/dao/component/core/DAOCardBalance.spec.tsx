import { translate } from "locale";
import DAOCardBalance from "module/dao/component/core/DAOAccountCard/DAOCardBalance/DAOCardBalance";
import { render, SuccessApiCall } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import { MockedDAOBalance } from "mocks/dao";
import { waitFor } from "@testing-library/react-native";

describe("DAO Card balance test", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getDAOBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        jest.spyOn(CkbServiceMock.prototype, "getCKBBalance").mockReturnValue(
            SuccessApiCall({
                totalBalance: BigInt(20000),
                occupiedBalance: BigInt(9600),
                freeBalance: BigInt(12635),
            }),
        );

        const screen = render(<DAOCardBalance />);
        expect(screen.getByText(translate("available"))).toBeDefined();
        expect(screen.getByText(translate("locked"))).toBeDefined();
        expect(screen.getByText(translate("current_apc"))).toBeDefined();
        expect(screen.getAllByTestId("actIndicator")).toHaveLength(3);
        await waitFor(() => expect(screen.getByText("12,635")).toBeDefined()); // Available
        await waitFor(() => expect(screen.getByText("594")).toBeDefined()); // Locked
        expect(screen.getByText("323")).toBeDefined(); // Locked decimals
        expect(screen.getByText("2.4%")).toBeDefined(); // apc
    });
});
