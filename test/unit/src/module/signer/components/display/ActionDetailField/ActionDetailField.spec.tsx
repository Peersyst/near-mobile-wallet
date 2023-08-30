import { ChevronLeftIcon } from "@peersyst/react-native-components";
import { ChevronRightIcon } from "icons";
import ActionDetailField from "module/signer/components/display/ActionDetailField/ActionDetailField";
import { render, screen } from "test-utils";

describe("ActionDetailField", () => {
    test("Renders correctly", () => {
        render(<ActionDetailField label="label" content="content" leftIcon={ChevronLeftIcon} rightIcon={ChevronRightIcon} />);

        expect(screen.getByText("label")).toBeDefined();
        expect(screen.getByText("content")).toBeDefined();
        expect(screen.getByTestId("ChevronLeftIcon")).toBeDefined();
        expect(screen.getByTestId("ChevronRightIcon")).toBeDefined();
    });
});
