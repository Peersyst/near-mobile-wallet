import { translate } from "locale";
import DAOCardButtons from "module/dao/component/core/DAOAccountCard/DAOCardButtons/DAOCardButtons";
import { fireEvent, render } from "test-utils";
import * as UseModal from "module/common/component/base/feedback/ModalProvider/hooks/useModal";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import DepositModal from "module/dao/component/core/DepositModal/DepositModal";

describe("Test for the DoaCardBalance", () => {
    test("Returns correctly", () => {
        const screen = render(<DAOCardButtons />);
        expect(screen.getByText(translate("deposit"))).toBeDefined();
        expect(screen.getByTestId("DAODepositIcon")).toBeDefined();
        expect(screen.getByTestId("DAOWithdrawIcon")).toBeDefined();
        expect(screen.getByText(translate("withdraw"))).toBeDefined();
    });
    test("Triggers deposit function correctly", () => {
        const showModal = jest.fn();
        jest.spyOn(UseModal, "useModal").mockReturnValue({ showModal } as any);
        const screen = render(<DAOCardButtons />);
        const button = screen.getByText(translate("deposit"));
        fireEvent.press(button);
        expect(showModal).toHaveBeenCalledWith(DepositModal);
    });
    test("Triggers withdraw function correctly", () => {
        const showModal = jest.fn();
        jest.spyOn(UseModal, "useModal").mockReturnValue({ showModal } as any);
        const screen = render(<DAOCardButtons />);
        const button = screen.getByText(translate("withdraw"));
        fireEvent.press(button);
        expect(showModal).toHaveBeenCalledWith(ReceiveModal);
    });
});
