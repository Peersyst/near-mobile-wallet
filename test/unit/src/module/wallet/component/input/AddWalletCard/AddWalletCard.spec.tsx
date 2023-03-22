import { render, translate, screen, fireEvent } from "test-utils";
import AddWalletCard from "module/wallet/component/display/AddWalletCard/AddWalletCard";
import { UseModalMock, UseWalletStateMock } from "test-mocks";
import ImportWalletModal from "module/wallet/component/core/ImportWalletModal/ImportWalletModal";
import CreateWalletModal from "module/wallet/component/core/CreateWalletModal/CreateWalletModal";

describe("AddWalletCard tests", () => {
    new UseWalletStateMock();
    test("Renders correctly", () => {
        render(<AddWalletCard />);
        expect(screen.getByText(translate("create_your_account"))).toBeDefined();
        expect(screen.getByText(translate("import"))).toBeDefined();
        expect(screen.getByText(translate("create"))).toBeDefined();
    });
    test("Opens import modal", () => {
        const { showModal } = new UseModalMock();
        render(<AddWalletCard />);
        const btn = screen.getByText(translate("import"));
        expect(btn).toBeDefined();
        fireEvent.press(btn);
        expect(showModal).toHaveBeenCalledWith(ImportWalletModal);
    });
    test("Opens create modal", () => {
        const { showModal } = new UseModalMock();
        render(<AddWalletCard />);
        const btn = screen.getByText(translate("create"));
        expect(btn).toBeDefined();
        fireEvent.press(btn);
        expect(showModal).toHaveBeenCalledWith(CreateWalletModal);
    });
});
