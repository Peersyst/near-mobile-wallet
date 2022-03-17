import { render } from "test-utils";
import SendToAddressScreen from "module/transaction/screen/SendToAddressScreen/SendToAddressScreen";
import * as UseWallet from "module/wallet/hook/useWallet";
import * as Recoil from "recoil";
import * as UseModal from "module/common/component/base/feedback/ModalProvider/hooks/useModal";
import { cells } from "mocks/cells";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { QrScanner } from "react-native-components";

describe("SendToAddressScreen tests", () => {
    beforeAll(() => {
        jest.spyOn(UseWallet, "default").mockReturnValue({ state: { cells, selectedAccount: 0 } } as any);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<SendToAddressScreen />);
        expect(screen.getByText(translate("select_an_account") + ":")).toBeDefined();
        expect(screen.getAllByText(cells[0].name)).toHaveLength(2);
        expect(screen.getByText(translate("send_to") + ":")).toBeDefined();
        expect(screen.getByPlaceholderText(translate("address"))).toBeDefined();
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Sets send state", async () => {
        const setSendState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(setSendState);
        const screen = render(<SendToAddressScreen />);
        const input = screen.getByPlaceholderText(translate("address"));
        fireEvent.changeText(input, "receiverAddress");
        fireEvent.press(screen.getByText(translate("next")));
        await waitFor(() => expect(setSendState).toHaveBeenCalled());
    });
  
    test("Shows scan qr code modal", () => {
        const showModal = jest.fn();
        jest.spyOn(UseModal, "useModal").mockReturnValue({ showModal } as any);
        const screen = render(<SendToAddressScreen />);
        fireEvent.press(screen.getByTestId("ScanIcon"));
        expect(showModal).toHaveBeenCalledWith(QrScanner, expect.any(Object));
    });

});
