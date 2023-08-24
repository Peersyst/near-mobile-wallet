import DeployContractDetails from "module/signer/components/display/SignRequestDetails/actions/DeployContractDetails";
import { render, screen, translate } from "test-utils";

describe("DeployContractDetails", () => {
    test("Renders correctly", () => {
        const mockCode = new Uint8Array(32);

        render(<DeployContractDetails params={{ code: mockCode }} />);

        expect(screen.getByText(translate("deployContract"))).toBeDefined();
        expect(screen.getByText(translate("deployContractDescription"))).toBeDefined();
    });
});
