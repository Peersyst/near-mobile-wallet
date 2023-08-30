import PermissionField from "module/signer/components/display/PermissionField/PermissionField";
import { render, screen } from "test-utils";

describe("PermissionField", () => {
    test("Renders correctly info type", () => {
        render(<PermissionField type="info" label="label" />);

        expect(screen.getByText("label")).toBeDefined();
        expect(screen.getByTestId("CircleCheckIcon")).toBeDefined();
    });

    test("Renders correctly forbidden type", () => {
        render(<PermissionField type="forbidden" label="label" />);

        expect(screen.getByText("label")).toBeDefined();
        expect(screen.getByTestId("CircleErrorIcon")).toBeDefined();
    });

    test("Renders correctly critical type", () => {
        render(<PermissionField type="critical" label="label" />);

        expect(screen.getByText("label")).toBeDefined();
        expect(screen.getByTestId("WarningIcon")).toBeDefined();
    });
});
