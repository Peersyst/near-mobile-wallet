import { render, translate } from "test-utils";
import * as Recoil from "recoil";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { UseWalletStateMock } from "test-mocks";
import AddStakeModal from "module/staking/component/core/AddStakeModal/AddStakeModal";

describe("AddStakeModal tests", () => {
    new UseWalletStateMock();
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        render(<AddStakeModal />);

        expect(screen.getByText(translate("stake_your_near"))).toBeDefined();
    });

    test("Resets send state on close", async () => {
        const handleExited = jest.fn();
        const resetSendState = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(resetSendState);

        render(<AddStakeModal onExited={handleExited} />);

        fireEvent.press(screen.getByTestId("BackIcon"));
        await waitFor(() => expect(resetSendState).toHaveBeenCalled());
        expect(handleExited).toHaveBeenCalled();
    });
});
