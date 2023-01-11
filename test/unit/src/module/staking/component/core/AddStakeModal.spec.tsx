import { render, translate } from "test-utils";
import * as Recoil from "recoil";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { UseWalletStateMock } from "test-mocks";
import AddStakeModal from "module/staking/component/core/AddStakeModal/AddStakeModal";

describe("AddStakeModal tests", () => {
    new UseWalletStateMock();
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<AddStakeModal />);
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Resets send state on close", async () => {
        const handleExited = jest.fn();
        const resetSendState = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(resetSendState);
        const screen = render(<AddStakeModal onExited={handleExited} />);
        fireEvent.press(screen.getByTestId("BackIcon"));
        await waitFor(() => expect(resetSendState).toHaveBeenCalled());
        expect(handleExited).toHaveBeenCalled();
    });
});
