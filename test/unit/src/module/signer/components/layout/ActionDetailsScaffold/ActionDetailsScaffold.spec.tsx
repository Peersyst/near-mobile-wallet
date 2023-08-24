import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";
import { render, screen } from "test-utils";

describe("ActionDetailsScaffold", () => {
    test("Renders correctly", () => {
        render(<ActionDetailsScaffold header="header" description="description" />);

        expect(screen.getByText("header")).toBeDefined();
        expect(screen.getByText("description")).toBeDefined();
    });
});
