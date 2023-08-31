import FunctionCallDetails from "module/signer/components/display/SignRequestDetails/actions/FunctionCallDetails";
import { render, screen, translate } from "test-utils";

describe("FunctionCallDetails", () => {
    test("Renders correctly", () => {
        render(<FunctionCallDetails params={{ methodName: "methodName", deposit: "0", gas: "0" }} receiverId="receiverId" />);

        expect(screen.getByText(translate("callSmartContract"))).toBeDefined();
        expect(screen.getByText(translate("callSmartContractDescription", { contract: "receiverId" }))).toBeDefined();

        expect(screen.getByText(translate("contract"))).toBeDefined();
        expect(screen.getByText(translate("methodName"))).toBeDefined();
        expect(screen.getByText(translate("gas"))).toBeDefined();
        expect(screen.getByText(translate("deposit"))).toBeDefined();
    });
});
