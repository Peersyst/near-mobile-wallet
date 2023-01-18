import { render, translate } from "test-utils";
import * as Recoil from "recoil";
import { waitFor } from "@testing-library/react-native";
import { StakeStateMock, UseWalletStateMock } from "test-mocks";
import ConfirmStakingScreen from "module/staking/screen/ConfirmStakingScreen/ConfirmStakingScreen";

describe("ConfirmStakingScreen.spec tests", () => {
    new UseWalletStateMock();
    const stakeStateMock = new StakeStateMock();
    const setStakeState = jest.fn();

    beforeAll(() => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([stakeStateMock, setStakeState]);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        const screen = render(<ConfirmStakingScreen />);

        await waitFor(() => expect(screen.getByText(translate("confirm_new_staking_of"))).toBeDefined());
        await waitFor(() => expect(screen.getByText(translate("with"))).toBeDefined());

        //expect(screen.getByText(stakeStateMock.validator.accountId)).toBeDefined();
        //expect(screen.getByText(stakeStateMock.amount + "% " + capitalize(translate("fee")) + " - ")).toBeDefined();
        //expect(screen.getByText(translate("active"))).toBeDefined();

        expect(screen.getByText(translate("cancel"))).toBeDefined();
        expect(screen.getByText(translate("next"))).toBeDefined();
    });
});
