import DeleteKeyDetails from "module/signer/components/display/SignRequestDetails/actions/DeleteKeyDetails";
import { formatPublicKey } from "module/signer/utils/formatPublicKey";
import { render, screen, translate } from "test-utils";

describe("DeleteKeyDetails", () => {
    test("Renders correctly without metadata", () => {
        const mockPublicKey = "ed25519:myPublicKey1234";

        render(<DeleteKeyDetails params={{ publicKey: mockPublicKey }} />);

        expect(screen.getByText(translate("confirmDisconnect"))).toBeDefined();
        expect(screen.getByText(translate("confirmDisconnectDescription"))).toBeDefined();
        expect(screen.getByText(translate("accessKey"))).toBeDefined();
        expect(screen.getByText(formatPublicKey(mockPublicKey, { digits: 12 }))).toBeDefined();
    });

    test("Renders correctly with metadata", () => {
        const mockPublicKey = "ed25519:myPublicKey1234";

        render(<DeleteKeyDetails params={{ publicKey: mockPublicKey }} metadata={{ name: "name", logoUrl: "logoUrl" }} />);

        expect(screen.getByText(translate("confirmDisconnect"))).toBeDefined();
        expect(screen.getByText(translate("confirmDisconnectDescription"))).toBeDefined();
        expect(screen.getByText(translate("accessKey"))).toBeDefined();
        expect(screen.getByText(formatPublicKey(mockPublicKey, { digits: 12 }))).toBeDefined();

        expect(screen.getByTestId("CircleErrorIcon")).toBeDefined();
    });
});
