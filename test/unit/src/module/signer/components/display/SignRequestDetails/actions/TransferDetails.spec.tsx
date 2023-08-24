import TransferDetails from "module/signer/components/display/SignRequestDetails/actions/TransferDetails";
import { render, translate, screen } from "test-utils";

describe("TransferDetails", () => {
    test("Renders correctly", () => {
        const mockDeposit = "100000000";
        const mockReceiverId = "receiverId.testnet";

        render(<TransferDetails params={{ deposit: mockDeposit }} receiverId={mockReceiverId} />);

        expect(screen.getByText(translate("transferAction"))).toBeDefined();
        expect(screen.getByText(translate("transferActionDescription", { receiverId: mockReceiverId }))).toBeDefined();
    });
});
