import { ConnectedSite } from "module/wallet/component/display/ConnectedSite/ConnectedSite.types";
import ActionableConnectedSite from "module/wallet/component/feedback/ActionableConnectedSite/ActionableConnectedSite";
import { render, screen } from "test-utils";

describe("ActionableConnectedSite", () => {
    test("Renders correctly", () => {
        const mockSite = { name: "test", accessKey: { public_key: "publicKey" } } as ConnectedSite;

        render(<ActionableConnectedSite site={mockSite} />);

        expect(screen.getByText(mockSite.name)).toBeDefined();
    });
});
