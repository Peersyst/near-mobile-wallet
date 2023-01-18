import { render, translate } from "test-utils";
import StakingCurrentValidators from "module/staking/component/display/StakingCurrentValidators/StakingCurrentValidators";
import * as useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import { StakingValidatorMock } from "mocks/common/staking/stakingValidator.mock";
import { screen } from "@testing-library/react-native";

describe("Tests for StakingCurrentValidators", () => {
    test("Renders with validators", () => {
        const mockStakingValidator = new StakingValidatorMock({ status: "active" });
        jest.spyOn(useGetStakingValidators, "default").mockReturnValue({
            stakingValidators: [mockStakingValidator, mockStakingValidator, mockStakingValidator],
            isLoading: false,
        });

        render(<StakingCurrentValidators />);

        expect(screen.getAllByTestId("UserCheckIcon")).toHaveLength(3);
        expect(screen.getAllByText(translate("active"))).toHaveLength(3);
        expect(screen.getAllByText(mockStakingValidator.accountId)).toHaveLength(3);
    });

    test("Renders without validators", () => {
        jest.spyOn(useGetStakingValidators, "default").mockReturnValue({
            stakingValidators: [],
            isLoading: false,
        });

        render(<StakingCurrentValidators />);

        expect(screen.getByText(translate("not_using_validators", { ns: "error" })));
    });
});
