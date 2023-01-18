import { render, translate } from "test-utils";
import ValidatorInformation from "module/staking/component/core/ValidatorInformation/ValidatorInformation";
import { screen } from "@testing-library/react-native";

import { capitalize } from "@peersyst/react-utils";
import { ValidatorMock } from "mocks/NearSdk/validator.mock";

describe("Tests for ValidatorInformation", () => {
    test("Renders correctly with active validator", () => {
        const mockedValidator = new ValidatorMock({ fee: 10 });
        render(<ValidatorInformation validator={mockedValidator} />);

        expect(screen.getByText(mockedValidator.accountId)).toBeDefined();
        expect(screen.getByText("10% " + capitalize(translate("fee")) + " - ")).toBeDefined();
        expect(screen.getByText(translate("inactive"))).toBeDefined();
        expect(screen.getByText(mockedValidator!.stakingBalance!.staked.toString() + " NEAR")).toBeDefined();

        expect(screen.getByTestId("UserCheckIcon")).toBeDefined();
    });
});
