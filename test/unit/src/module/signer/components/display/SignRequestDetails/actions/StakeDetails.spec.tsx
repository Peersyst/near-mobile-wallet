import StakeDetails from "module/signer/components/display/SignRequestDetails/actions/StakeDetails";
import { render, translate, screen } from "test-utils";

describe("StakeDetails", () => {
    test("Renders correctly", () => {
        render(<StakeDetails params={{ stake: "100", publicKey: "publicKey" }} />);

        expect(screen.getByText(translate("stakeAction"))).toBeDefined();
        expect(screen.getByText(translate("stakeActionDescription"))).toBeDefined();
    });
});
