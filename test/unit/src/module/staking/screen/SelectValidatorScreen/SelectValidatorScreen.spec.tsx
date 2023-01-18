import { render } from "test-utils";
import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";

describe("Tests for SelectValidatorScreen", () => {
    test("Renders correctly", () => {
        const mockMessage = "message";
        render(<SelectValidatorScreen message={} validators={} loading={} onFinish={} />);
    });
});
