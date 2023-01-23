import { render, translate } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import { StakeStateMock, StakingBalanceMock, UseWalletStateMock } from "test-mocks";
import { capitalize } from "@peersyst/react-utils";
import * as Recoil from "recoil";
import AddStakeConfirmScreen from "module/staking/screen/ConfirmScreen/AddStakeConfirmScreen/AddStakeConfirmScreen";

describe("AddStakeConfirmScreen.spec tests", () => {
    new UseWalletStateMock();
    const stakingBalanceMock = new StakingBalanceMock();

    const stakeStateMock = new StakeStateMock({
        validator: { accountId: "account", fee: 10, stakingBalance: stakingBalanceMock },
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue(stakeStateMock);
        const screen = render(<AddStakeConfirmScreen />);

        await waitFor(() => expect(screen.getByText(translate("confirm_new_action_of", { action: "staking" }))).toBeDefined());
        expect(screen.getByText(translate("cancel"))).toBeDefined();

        expect(screen.getByText(translate("next"))).toBeDefined();

        expect(screen.getByText(stakeStateMock.validator.accountId)).toBeDefined();
        expect(screen.getByText("10% " + capitalize(translate("fee")) + " - ")).toBeDefined();
    });
});
