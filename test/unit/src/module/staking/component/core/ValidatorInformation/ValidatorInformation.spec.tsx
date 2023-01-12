import { render } from "test-utils";
import ValidatorInformation from "module/staking/component/core/ValidatorInformation/ValidatorInformation";
import { StakingBalanceMock } from "mocks/NearSdk";
import { screen } from "@testing-library/react-native";

describe("Tests for ValidatorInformation", () => {
    const stakingBalanceMock = new StakingBalanceMock();

    test("Renders correctly", () => {
        const mockedValidator = { accountId: "account", fee: 10, stakingBalance: stakingBalanceMock };
        render(<ValidatorInformation validator={mockedValidator} />);

        expect(screen.getByText(mockedValidator.accountId)).toBeDefined();
        expect(screen.getByText(mockedValidator.stakingBalance.staked.toString())).toBeDefined();

        expect(screen.getByTestId("UserCheckIcon")).toBeDefined();
    });
});
