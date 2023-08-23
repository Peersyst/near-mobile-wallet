import AddKeyDetails from "module/signer/components/display/SignRequestDetails/actions/AddKeyDetails";
import { render, screen, translate } from "test-utils";

describe("AddKeyDetails", () => {
    test("Renders correctly as a FullAccess key", () => {
        render(<AddKeyDetails params={{ accessKey: { permission: "FullAccess" } }} />);

        expect(screen.getByText(translate("addFullAccessKey"))).toBeDefined();
        expect(screen.getByText(translate("addFullAccessKeyDescription"))).toBeDefined();
    });

    test("Renders correctly as FunctionCall key", () => {
        render(
            <AddKeyDetails
                params={{
                    accessKey: {
                        permission: { allowance: "1000000000000000000000000", methodNames: ["method1"], receiverId: "receiverId.testnet" },
                    },
                }}
            />,
        );

        expect(screen.getByText(translate("addAccessKey"))).toBeDefined();

        expect(screen.getByText(translate("allowedGas"))).toBeDefined();
        expect(screen.getByText(translate("methodNames"))).toBeDefined();
    });
});
