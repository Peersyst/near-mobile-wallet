import { render, translate } from "test-utils";
import * as Recoil from "recoil";
import { waitFor } from "@testing-library/react-native";
import { StakeStateMock, UseWalletStateMock } from "test-mocks";
import AddStakingScreen from "module/staking/screen/AddStakingScreen/AddStakingScreen";

describe("AddStakingScreen.spec tests", () => {
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
        const screen = render(<AddStakingScreen />);

        //await waitFor(() => expect(screen.getByText(translate("confirm_new_staking_of"))).toBeDefined());
        //await waitFor(() => expect(screen.getByText(translate("with"))).toBeDefined());

        //expect(screen.getByText(stakeStateMock.validator.accountId)).toBeDefined();
        //expect(screen.getByText(stakeStateMock.amount + "% " + capitalize(translate("fee")) + " - ")).toBeDefined();
        //expect(screen.getByText(translate("active"))).toBeDefined();

        expect(screen.getByText(translate("cancel"))).toBeDefined();
        expect(screen.getByText(translate("next"))).toBeDefined();
    });
});
