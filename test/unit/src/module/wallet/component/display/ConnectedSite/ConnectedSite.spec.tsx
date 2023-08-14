import ConnectedSite from "module/wallet/component/display/ConnectedSite/ConnectedSite";
import { render, screen } from "test-utils";

describe("ConnectedSite", () => {
    test("Renders correctly", () => {
        render(<ConnectedSite site={{ name: "test", publicKey: "test" }} />);

        expect(screen.getByText("test")).toBeDefined();
    });
});
