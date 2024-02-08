import { render, translate } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import SendSetAmountScreen from "module/transaction/screen/SendSetAmountScreen/SendSetAmountScreen";
import * as Recoil from "recoil";
import * as Genesys from "@peersyst/react-native-components";
import { config } from "config";
import { AccountBalanceMock, SendStateMock, UseGetAllAssetsMock, UseGetBalanceMock, UseWalletStateMock } from "test-mocks";
import { SendScreens } from "module/transaction/screen/SendScreens.types";

describe("SendAmountAndMessageScreen tests", () => {
    new UseWalletStateMock();
    const balance = new AccountBalanceMock({ available: "100" });
    const {
        balance: { available },
    } = new UseGetBalanceMock({ balance });
    new UseGetAllAssetsMock({ isLoading: false });
    const sendStateMock = new SendStateMock();
    const setSendState = jest.fn();

    beforeAll(() => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([sendStateMock, setSendState]);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly NEAR by default", async () => {
        const screen = render(<SendSetAmountScreen />);
        //Asset
        await waitFor(() => expect(screen.getByText(config.estimatedFee + " " + config.tokenName)).toBeDefined());
        expect(screen.getByText(translate("number", { val: available }) + " " + config.tokenName)).toBeDefined();
        //Amount Input
        expect(screen.getByPlaceholderText(translate("enter_amount"))).toBeDefined();
        expect(screen.getByText(config.tokenName)).toBeDefined();
        //Button
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Sets send state and advances to next screen", async () => {
        const setTab = jest.fn();
        jest.spyOn(Genesys, "useSetTab").mockReturnValue(setTab);
        const screen = render(<SendSetAmountScreen />);
        const amountInput = await waitFor(() => screen.getByPlaceholderText(translate("enter_amount")));
        fireEvent.changeText(amountInput, "99");
        fireEvent.press(screen.getByText(translate("next")));
        await waitFor(() => expect(setSendState).toHaveBeenCalled());
        expect(setTab).toHaveBeenCalledWith(SendScreens.CONFIRMATION);
    });
});
