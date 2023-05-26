import { render, translate, screen } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import WalletCardButtons from "module/wallet/component/core/WalletCard/WalletCardButtons/WalletCardButtons";
import { capitalize } from "@peersyst/react-utils";
import { UseConfigMock, UseModalMock } from "test-mocks";
import * as UseIsMainnet from "module/settings/hook/useIsMainnet";
import * as Navigation from "@react-navigation/native";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";

describe("WalletCardButtons tests", () => {
    jest.spyOn(UseIsMainnet, "default").mockReturnValue(true);

    test("Renders correctly", () => {
        new UseConfigMock({ config: { enableBuy: false } });
        render(<WalletCardButtons />);
        expect(screen.getByText(capitalize(translate("send")))).toBeDefined();
        expect(screen.getByText(capitalize(translate("receive")))).toBeDefined();
        expect(screen.queryByText(translate("buy"))).toBeNull();
    });

    test("Show buys button", () => {
        new UseConfigMock({ config: { enableBuy: true } });
        render(<WalletCardButtons />);
        expect(screen.getByText(capitalize(translate("send")))).toBeDefined();
        expect(screen.getByText(capitalize(translate("receive")))).toBeDefined();
        expect(screen.getByText(translate("buy"))).toBeDefined();
    });

    test("Triggers correctly send button", () => {
        const { showModal } = new UseModalMock();
        render(<WalletCardButtons />);
        const button = screen.getByText(capitalize(translate("send")));
        fireEvent.press(button);
        expect(showModal).toHaveBeenCalledWith(SendModal);
    });

    test("Triggers correctly receive button", () => {
        const { showModal } = new UseModalMock();
        render(<WalletCardButtons />);
        const button = screen.getByText(capitalize(translate("receive")));
        fireEvent.press(button);
        expect(showModal).toHaveBeenCalledWith(ReceiveModal);
    });

    test("Goes to buy screen", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigate });
        new UseConfigMock({ config: { enableBuy: true } });
        render(<WalletCardButtons />);
        const button = screen.getByText(capitalize(translate("buy")));
        fireEvent.press(button);
        expect(mockedNavigate).toHaveBeenCalledWith(MainScreens.FIAT_ORDERS);
    });
});
