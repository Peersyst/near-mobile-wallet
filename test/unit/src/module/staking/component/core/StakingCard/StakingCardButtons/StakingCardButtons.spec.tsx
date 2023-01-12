import { render, translate } from "test-utils";
import StakingCardButtons from "module/staking/component/core/StakingCard/StakingCardButtons/StakingCardButtons";
import { screen } from "@testing-library/react-native";

describe("Tests for StakingCardButtons", () => {
    test("Renders correctly", () => {
        render(<StakingCardButtons />);

        expect(screen.getByRole("button", { name: translate("stake_my_tokens") })).toBeDefined();
    });
});
