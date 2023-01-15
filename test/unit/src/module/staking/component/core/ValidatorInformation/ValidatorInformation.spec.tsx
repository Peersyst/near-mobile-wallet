import { render, translate } from "test-utils";
import ValidatorInformation from "module/staking/component/core/ValidatorInformation/ValidatorInformation";
import { StakingBalanceMock } from "mocks/NearSdk";
import { screen } from "@testing-library/react-native";
import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import { capitalize } from "@peersyst/react-utils";

describe("Tests for ValidatorInformation", () => {
    const stakingBalanceMock = new StakingBalanceMock();

    test("Renders correctly with active validator", () => {
        const mockedValidator: StakingValidator = { accountId: "account", fee: 10, stakingBalance: stakingBalanceMock, status: "active" };
        render(<ValidatorInformation validator={mockedValidator} />);

        expect(screen.getByText(mockedValidator.accountId)).toBeDefined();
        expect(screen.getByText("10% " + capitalize(translate("fee")) + " - ")).toBeDefined();
        expect(screen.getByText(translate("active"))).toBeDefined();
        expect(screen.getByText(mockedValidator!.stakingBalance!.staked.toString() + " NEAR")).toBeDefined();

        expect(screen.getByTestId("UserCheckIcon")).toBeDefined();
    });
});
