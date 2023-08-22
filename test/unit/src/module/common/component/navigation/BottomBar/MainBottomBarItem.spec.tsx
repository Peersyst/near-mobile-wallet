import { QRCodeIcon } from "icons";
import MainBottomBarItem from "module/common/component/navigation/BottomBar/MainBottomBarItem/MainBottomBarItem";
import { render, screen } from "test-utils";

describe("MainBottomBarItem test", () => {
    test("Renders correctly", () => {
        render(<MainBottomBarItem Icon={QRCodeIcon} label="label" />);

        expect(screen.getByTestId("QRCodeIcon")).toBeDefined();
        expect(screen.getByText("label")).toBeDefined();
    });
});
