import { ConnectedSite } from "module/signer/components/display/ConnectedSite/ConnectedSite.types";
import ActionableConnectedSite from "module/signer/containers/ActionableConnectedSite/ActionableConnectedSite";
import { render, screen } from "test-utils";

describe("ActionableConnectedSite", () => {
    test("Renders correctly", () => {
        const mockSite = { name: "test", accessKey: { public_key: "publicKey" } } as ConnectedSite;

        render(<ActionableConnectedSite site={mockSite} />);

        expect(screen.getByText(mockSite.name)).toBeDefined();
    });
});
