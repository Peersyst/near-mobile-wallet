import { ConnectedSite } from "module/signer/components/display/ConnectedSite/ConnectedSite.types";
import ConnectedSitesList from "module/wallet/component/feedback/ConnectedSitesList/ConnectedSitesList";
import { render, screen, translate } from "test-utils";

describe("ConnectedSitesList", () => {
    test("Renders correctly", () => {
        const mockConnectedSite = { name: "test", accessKey: { public_key: "publicKey" } } as ConnectedSite;
        const mockSites: ConnectedSite[] = [mockConnectedSite, mockConnectedSite, mockConnectedSite];

        render(<ConnectedSitesList sites={mockSites} />);

        expect(screen.getAllByText(mockSites[0].name)).toHaveLength(mockSites.length);
    });

    test("Shows empty list component", () => {
        render(<ConnectedSitesList sites={[]} />);

        expect(screen.getByText(translate("noConnectedSites", { ns: "error" }))).toBeDefined();
        expect(screen.getByText(translate("noConnectedSitesDescription", { ns: "error" }))).toBeDefined();
    });
});
