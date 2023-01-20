import { render, translate } from "test-utils";
import * as Recoil from "recoil";
import { waitFor } from "@testing-library/react-native";
import { StakeStateMock, StakingBalanceMock, UseWalletStateMock } from "test-mocks";
import ConfirmAddStakeScreen from "module/staking/screen/ConfirmAddStakeScreeen/ConfirmAddStakeScreeen";
import { capitalize } from "@peersyst/react-utils";

describe("ConfirmAddStakeScreen.spec tests", () => {
    new UseWalletStateMock();
    const stakingBalanceMock = new StakingBalanceMock();

    const stakeStateMock = new StakeStateMock({
        validator: { accountId: "account", fee: 10, stakingBalance: stakingBalanceMock },
    });

    beforeAll(() => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue(stakeStateMock);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        const onEditValidator = jest.fn();
        const sendTransaction = jest.fn();
        const handleExited = jest.fn();

        const screen = render(
            <ConfirmAddStakeScreen
                label={translate("confirm_new_staking_of")}
                onEditValidator={onEditValidator}
                sendTransaction={sendTransaction}
                isError={false}
                isSuccess={false}
                isLoading={false}
                onExited={handleExited}
            />,
        );

        await waitFor(() => expect(screen.getByText(translate("confirm_new_staking_of"))).toBeDefined());
        await waitFor(() => expect(screen.getByText(translate("with"))).toBeDefined());

        expect(screen.getByText(translate("cancel"))).toBeDefined();

        expect(screen.getByText(translate("next"))).toBeDefined();

        expect(screen.getByText(stakeStateMock.validator.accountId)).toBeDefined();
        expect(screen.getByText("10% " + capitalize(translate("fee")) + " - ")).toBeDefined();
    });
});
