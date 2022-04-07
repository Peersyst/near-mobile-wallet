import { render } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import * as Recoil from "recoil";
import * as UseSetTab from "module/common/component/base/navigation/Tabs/hook/useSetTab";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { mockedUseWallet } from "mocks/useWalletState";
import DepositSelectAccountScreen from "module/dao/screen/DepositSelectAccountScreen/DepositSelectAccountScreen";
import { DepositScreens } from "module/dao/component/core/DepositModal/DepositModal";

describe("DepositSelectAccountScreen tests", () => {
    beforeAll(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<DepositSelectAccountScreen />);
        expect(screen.getByText(translate("select_a_wallet") + ":")).toBeDefined();
        expect(screen.getAllByText(mockedUseWallet.state.wallets[0].name)).toHaveLength(2);
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Sets send state and advances to next tab with default selected wallet", async () => {
        const setSendState = jest.fn();
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([{}, setSendState]);
        const setTab = jest.fn();
        jest.spyOn(UseSetTab, "default").mockReturnValue(setTab);
        const screen = render(<DepositSelectAccountScreen />);
        fireEvent.press(screen.getByText(translate("next")));
        await waitFor(() => expect(setSendState).toHaveBeenCalled());
        expect(setTab).toHaveBeenCalledWith(DepositScreens.AMOUNT_AND_MESSAGE);
    });
});
