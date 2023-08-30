import { DAppMock } from "mocks/common/signer/DApp.mock";
import DisconnectableDApp from "module/signer/components/feedback/DisconnectableDApp/DisconnectableDApp";
import { render, screen, translate } from "test-utils";

describe("DisconnectableDApp", () => {
    test("Renders correctly", () => {
        const mockDApp = new DAppMock();

        render(<DisconnectableDApp dapp={mockDApp} />);

        expect(screen.getByText(translate("disconnect"))).toBeDefined();
    });
});
