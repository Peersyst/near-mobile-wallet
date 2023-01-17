import { render, translate } from "test-utils";
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
        expect(screen.getByText(translate("stake_your_near"))).toBeDefined();
    });
});
