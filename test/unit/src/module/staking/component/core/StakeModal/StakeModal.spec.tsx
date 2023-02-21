import { render, translate } from "test-utils";
import * as Recoil from "recoil";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { UseWalletStateMock } from "test-mocks";
import StakeModal from "module/staking/component/core/StakeModal/StakeModal";
import Button from "module/common/component/input/Button/Button";

describe("StakeModal tests", () => {
    new UseWalletStateMock();
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(
            <StakeModal
                tabs={[
                    {
                        title: "Stake",
                        tabContent: <Button>{translate("next")}</Button>,
                        tabIndex: 0,
                    },
                    {
                        title: "Stake",
                        tabContent: <Button>{translate("next")}</Button>,
                        tabIndex: 1,
                    },
                ]}
            />,
        );
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Resets stake state on close", async () => {
        const handleExited = jest.fn();
        const resetStakeState = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(resetStakeState);
        const screen = render(
            <StakeModal
                onExited={handleExited}
                tabs={[
                    {
                        title: "Stake",
                        tabContent: <Button>{translate("next")}</Button>,
                        tabIndex: 0,
                    },
                    {
                        title: "Stake",
                        tabContent: <Button>{translate("next")}</Button>,
                        tabIndex: 1,
                    },
                ]}
            />,
        );
        fireEvent.press(screen.getByTestId("BackIcon"));
        await waitFor(() => expect(resetStakeState).toHaveBeenCalled());
        expect(handleExited).toHaveBeenCalled();
    });
});
