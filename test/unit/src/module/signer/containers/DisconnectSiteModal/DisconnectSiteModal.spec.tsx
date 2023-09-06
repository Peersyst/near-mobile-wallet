import { ConnectedSiteMock } from "mocks/common/signer/ConnectedSite.mock";
import DisconnectSiteModal from "module/signer/containers/DisconnectSiteModal/DisconnectSiteModal";
import { render, screen, translate } from "test-utils";

describe("DisconnectSiteModal", () => {
    test("Renders correctly", () => {
        const mockConnectedSite = new ConnectedSiteMock();

        render(<DisconnectSiteModal site={mockConnectedSite} />);

        expect(screen.getByText(translate("connectedWith", { name: mockConnectedSite.name }).toUpperCase()));

        expect(screen.getByRole("button", { name: translate("cancel") }));
        expect(screen.getByRole("button", { name: translate("disconnect") }));
    });
});
