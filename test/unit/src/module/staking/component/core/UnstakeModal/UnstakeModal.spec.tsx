import { render, translate } from "test-utils";
import UnstakeModal from "module/staking/component/core/UnstakeModal/UnstakeModal";
import { screen } from "@testing-library/react-native";

describe("Tests for Unstake modal", () => {
    test("Renders correctly", () => {
        render(<UnstakeModal />);

        expect(screen.getByText(translate("select_validator"))).toBeDefined();
    });
});
