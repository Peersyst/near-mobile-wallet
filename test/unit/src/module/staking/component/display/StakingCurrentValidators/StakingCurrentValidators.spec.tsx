import { render, translate } from "test-utils";
import StakingCurrentValidators from "module/staking/component/display/StakingCurrentValidators/StakingCurrentValidators";
import * as useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import { screen } from "@testing-library/react-native";
import { ValidatorMock } from "mocks/NearSdk/validator.mock";

describe("Tests for StakingCurrentValidators", () => {
    test("Renders with validators", () => {
        const mockStakingValidator = new ValidatorMock({ active: true });
        jest.spyOn(useGetStakingValidators, "default").mockReturnValue({
            stakingValidators: [mockStakingValidator, mockStakingValidator, mockStakingValidator],
            isLoading: false,
            refetch: jest.fn(),
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
            refetch: jest.fn(),
        });

        render(<StakingCurrentValidators />);

        expect(screen.getByText(translate("not_using_validators", { ns: "error" })));
    });
});
