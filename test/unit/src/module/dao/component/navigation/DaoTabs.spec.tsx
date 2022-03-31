import { render } from "test-utils";
import { translate } from "locale";
import { fireEvent } from "@testing-library/react-native";
import DaoTabs from "module/dao/navigation/DaoTabs/DaoTabs";

describe("DaoTabs tests", () => {
    test("Renders correctly", () => {
        const screen = render(<DaoTabs />);
        expect(screen.getByText("DaoTab1")).toBeDefined();
        expect(screen.getByText(translate("deposits"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("completed")));
        expect(screen.getByText("DaoTab2")).toBeDefined();
    });
});
