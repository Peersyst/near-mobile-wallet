import ActionableConnectedSite from "module/wallet/component/feedback/ActionableConnectedSite/ActionableConnectedSite";
import { fireEvent, render, screen, translate } from "test-utils";

describe("ActionableConnectedSite", () => {
    test("Renders correctly", () => {
        const mockSite = { name: "test", publicKey: "test" };

        render(<ActionableConnectedSite site={mockSite} />);

        expect(screen.getByText(mockSite.name)).toBeDefined();
    });

    test("Renders dialog when action is clicked", () => {
        const mockSite = { name: "test", publicKey: "test" };

        render(<ActionableConnectedSite site={mockSite} />);

        expect(screen.queryByText(translate("deleteKeyConfirmation", { name: mockSite.name }))).toBeNull();

        fireEvent.press(screen.getByText(translate("disconnect")));

        expect(screen.getByText(translate("deleteKeyConfirmation", { name: mockSite.name }))).toBeDefined();
    });
});
