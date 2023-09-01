import AddKeyDetails from "module/signer/components/display/SignRequestDetails/actions/AddKeyDetails";
import { render, screen, translate } from "test-utils";

describe("AddKeyDetails", () => {
    test("Renders correctly as a FullAccess key", () => {
        render(<AddKeyDetails params={{ accessKey: { permission: "FullAccess" }, publicKey: "" }} />);

        expect(screen.getByText(translate("confirmConnectionWith"))).toBeDefined();
        expect(screen.getByText(translate("addFullAccessKeyDescription"))).toBeDefined();
    });

    test("Renders correctly as FunctionCall key", () => {
        render(
            <AddKeyDetails
                params={{
                    publicKey: "",
                    accessKey: {
                        permission: { allowance: "1000000000000000000000000", methodNames: ["method1"], receiverId: "receiverId.testnet" },
                    },
                }}
            />,
        );

        expect(screen.getByText(translate("confirmConnectionWith"))).toBeDefined();

        expect(screen.getByText(translate("contract"))).toBeDefined();
        expect(screen.getByTestId("ClipboardListIcon")).toBeDefined();
        expect(screen.getByText(translate("networkFeeAllowance"))).toBeDefined();
        expect(screen.getByTestId("DatabaseIcon")).toBeDefined();
    });
});
