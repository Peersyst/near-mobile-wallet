import { render, translate } from "test-utils";
import { screen } from "@testing-library/react-native";
import StakingCardButtons from "module/staking/component/display/StakingCard/StakingCardButtons/StakingCardButtons";

describe("Tests for StakingCardButtons", () => {
    test("Renders correctly", () => {
        render(<StakingCardButtons />);

        expect(screen.getByRole("button", { name: translate("stake_my_tokens") })).toBeDefined();
    });
});
