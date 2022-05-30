import { render } from "test-utils";
import SendToAddressScreen from "module/transaction/screen/SendToAddressScreen/SendToAddressScreen";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import * as Recoil from "recoil";
import * as UseSetTab from "module/common/component/base/navigation/Tabs/hook/useSetTab";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { mockedUseWallet } from "mocks/useWalletState";

describe("SendToAddressScreen tests", () => {
    beforeAll(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<SendToAddressScreen />);
        expect(screen.getByText(translate("select_a_wallet") + ":")).toBeDefined();
        expect(screen.getAllByText(mockedUseWallet.state.wallets[0].name)).toHaveLength(2);
        expect(screen.getByText(translate("send_to") + ":")).toBeDefined();
        expect(screen.getByPlaceholderText(translate("address"))).toBeDefined();
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Renders correctly when an addresses had been selected previously", () => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([{ senderWalletIndex: 1, receiverAddress: "receiver_address" }, jest.fn()]);
        const screen = render(<SendToAddressScreen />);
        expect(screen.getAllByText(mockedUseWallet.state.wallets[1].name)).toHaveLength(2);
        expect(screen.getByDisplayValue("receiver_address")).toBeDefined();
    });

    test("Sets send state and advances to next tab", async () => {
        const setSendState = jest.fn();
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([{}, setSendState]);
        const setTab = jest.fn();
        jest.spyOn(UseSetTab, "default").mockReturnValue(setTab);
        const screen = render(<SendToAddressScreen />);
        const input = screen.getByPlaceholderText(translate("address"));
        fireEvent.changeText(input, "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsq03ewkvsva4cchhntydu648l7lyvn9w2cctnpask");
        fireEvent.press(screen.getByText(translate("next")));
        await waitFor(() => expect(setSendState).toHaveBeenCalled());
        expect(setTab).toHaveBeenCalledWith(SendScreens.AMOUNT_AND_MESSAGE);
    });
});
