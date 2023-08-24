import DeleteKeyDetails from "module/signer/components/display/SignRequestDetails/actions/DeleteKeyDetails";
import { render, screen, translate } from "test-utils";

describe("DeleteKeyDetails", () => {
    test("Renders correctly", () => {
        const mockPublicKey = "publicKey";

        render(<DeleteKeyDetails params={{ publicKey: mockPublicKey }} />);

        expect(screen.getByText(translate("deleteAccessKey"))).toBeDefined();
        expect(screen.getByText(translate("deleteAccessKeyDescription"))).toBeDefined();
        expect(screen.getByText(mockPublicKey)).toBeDefined();
    });
});
