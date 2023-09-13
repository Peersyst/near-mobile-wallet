import NetworkMismatchError from "module/signer/components/feedback/NetworkMismatchError/NetworkMismatchError";
import { render, screen, translate } from "test-utils";

describe("NetworkMismatchError", () => {
    test("Renders correctly", () => {
        render(<NetworkMismatchError />);

        expect(screen.getByText(translate("networkMismatch", { ns: "error" }))).toBeDefined();
        expect(screen.getByText(translate("networkMismatchDescription", { ns: "error" }))).toBeDefined();
    });
});
