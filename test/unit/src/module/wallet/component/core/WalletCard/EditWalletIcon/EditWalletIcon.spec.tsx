import { render } from "test-utils";
import EditWalletIcon from "module/wallet/component/core/WalletCard/WalletCardHeader/EditWalletIcon/EditWalletIcon";
import { fireEvent } from "@testing-library/react-native";
import EditWalletModal from "module/wallet/component/core/EditWalletModal/EditWalletModal";
import { UseModalMock } from "test-mocks";

describe("EditWalletIcon tests", () => {
    test("Renders correctly", () => {
        const { showModal } = new UseModalMock();

        const screen = render(<EditWalletIcon index={0} />);
        fireEvent.press(screen.getByRole("button"));
        expect(showModal).toHaveBeenCalledWith(EditWalletModal, { index: 0 });
    });
});
