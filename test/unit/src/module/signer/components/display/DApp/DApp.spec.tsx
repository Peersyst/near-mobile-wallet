import { DAppMock } from "mocks/common/signer/DApp.mock";
import DApp from "module/signer/components/display/DApp/DApp";
import { render, screen, translate } from "test-utils";

describe("DApp", () => {
    test("Renders correctly when is not connected", () => {
        const mockDApp = new DAppMock();

        render(<DApp dapp={mockDApp} />);

        expect(screen.getByText(mockDApp.name)).toBeDefined();
        expect(screen.getByText(mockDApp.description)).toBeDefined();
        expect(screen.getByText(`#${mockDApp.tag}`)).toBeDefined();
        expect(screen.getByTestId("ExternalLinkIcon")).toBeDefined();
        expect(screen.getByText(translate("notConnected"))).toBeDefined();
    });

    test("Renders correctly when is not connected", () => {
        const mockDApp = new DAppMock();

        render(<DApp dapp={mockDApp} connected />);

        expect(screen.getByText(mockDApp.name)).toBeDefined();
        expect(screen.getByText(mockDApp.description)).toBeDefined();
        expect(screen.getByText(`#${mockDApp.tag}`)).toBeDefined();
        expect(screen.getByTestId("ExternalLinkIcon")).toBeDefined();
        expect(screen.getByText(translate("connected"))).toBeDefined();
    });
});
