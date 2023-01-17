import * as recoil from "recoil";
import { StakingValidatorMock } from "test-mocks";
import { render, translate } from "test-utils";
import SuccessScreen from "module/staking/screen/SuccessScreen/SuccessScreen";
import { screen } from "@testing-library/react-native";

describe("Tests for SuccessScreen component", () => {
    const mockStakingValidator = new StakingValidatorMock();

    test("Renders correctly on staking process", () => {
        jest.spyOn(recoil, "useRecoilState").mockReturnValue([mockStakingValidator, jest.fn()]);

        render(<SuccessScreen onClose={jest.fn} process="stake" />);

        expect(screen.getByText(translate("stakingSuccess"))).toBeDefined();
        expect(screen.getByRole("button", { name: translate("close") })).toBeDefined();

        expect(screen.getByText(mockStakingValidator.accountId)).toBeDefined();
        expect(screen.getByText(translate("staking"))).toBeDefined();
        expect(screen.getByText(translate("inactive"))).toBeDefined();
    });

    test("Renders correctly on unstaking process", () => {
        jest.spyOn(recoil, "useRecoilState").mockReturnValue([mockStakingValidator, jest.fn()]);

        render(<SuccessScreen onClose={jest.fn} process="unstake" />);

        expect(screen.getByText(translate("unstakingSuccess", { token: "X NEAR" }))).toBeDefined();
        expect(screen.getByRole("button", { name: translate("close") })).toBeDefined();

        expect(screen.getByText(mockStakingValidator.accountId)).toBeDefined();
        expect(screen.getByText(translate("staking"))).toBeDefined();
        expect(screen.getByText(translate("inactive"))).toBeDefined();
    });
});
