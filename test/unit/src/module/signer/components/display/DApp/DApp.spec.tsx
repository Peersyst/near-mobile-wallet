import DApp from "module/signer/components/display/DApp/DApp";
import { DAppTag } from "module/signer/components/display/DApp/DApp.types";
import { render, screen, translate } from "test-utils";

describe("DApp", () => {
    test("Renders correctly when is not connected", () => {
        const mockName = "name";
        const mockDescription = "description";
        const mockTag = DAppTag.DEX;
        const mockUrl = "url";

        render(<DApp name={mockName} description={mockDescription} tag={mockTag} url={mockUrl} logoUrl={mockUrl} />);

        expect(screen.getByText(mockName)).toBeDefined();
        expect(screen.getByText(mockDescription)).toBeDefined();
        expect(screen.getByText(`#${mockTag}`)).toBeDefined();
        expect(screen.getByTestId("ExternalLinkIcon")).toBeDefined();
        expect(screen.getByText(translate("notConnected"))).toBeDefined();
    });

    test("Renders correctly when is not connected", () => {
        const mockName = "name";
        const mockDescription = "description";
        const mockTag = DAppTag.DEX;
        const mockUrl = "url";

        render(<DApp name={mockName} description={mockDescription} tag={mockTag} url={mockUrl} logoUrl={mockUrl} connected />);

        expect(screen.getByText(mockName)).toBeDefined();
        expect(screen.getByText(mockDescription)).toBeDefined();
        expect(screen.getByText(`#${mockTag}`)).toBeDefined();
        expect(screen.getByTestId("ExternalLinkIcon")).toBeDefined();
        expect(screen.getByText(translate("connected"))).toBeDefined();
    });
});
