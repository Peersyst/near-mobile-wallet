import { render, translate } from "test-utils";
import * as useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import { screen } from "@testing-library/react-native";
import { ValidatorMock } from "mocks/NearSdk/validator.mock";
import MyCurrentValidatorsList from "module/staking/component/display/MyCurrentValidatorsList/MyCurrentValidatorsList";

describe("Tests for StakingCurrentValidators", () => {
    test("Renders with validators", () => {
        const mockStakingValidator = new ValidatorMock({ active: true });
        jest.spyOn(useGetStakingValidators, "default").mockReturnValue({
            stakingValidators: [mockStakingValidator, mockStakingValidator, mockStakingValidator],
            isLoading: false,
            refetch: jest.fn(),
        });

        render(<MyCurrentValidatorsList />);

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

        render(<MyCurrentValidatorsList />);

        expect(screen.getByText(translate("not_using_validators", { ns: "error" })));
    });
});
