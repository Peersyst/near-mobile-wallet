import * as UseModal from "module/common/component/base/feedback/ModalProvider/hooks/useModal";
import { render } from "test-utils";
import EditWalletIcon from "module/wallet/component/core/WalletCard/WalletCardHeader/EditWalletIcon/EditWalletIcon";
import { fireEvent } from "@testing-library/react-native";
import EditWalletModal from "module/wallet/component/core/EditWalletModal/EditWalletModal";

describe("EditWalletIcon tests", () => {
    test("Renders correctly", () => {
        const showModal = jest.fn();
        jest.spyOn(UseModal, "useModal").mockReturnValue({ showModal, hideModal: jest.fn(), isModalActive: jest.fn() });

        const screen = render(<EditWalletIcon index={0} />);
        fireEvent.press(screen.getByRole("button"));
        expect(showModal).toHaveBeenCalledWith(EditWalletModal, { index: 0 });
    });
});
