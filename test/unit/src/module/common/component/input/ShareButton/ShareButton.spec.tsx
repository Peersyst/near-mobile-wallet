import ShareButton from "module/common/component/input/ShareButton/ShareButton";
import { UseShareMock } from "test-mocks";
import { fireEvent, render, screen, translate } from "test-utils";

describe("Test for the ShareButton component", () => {
    const shareContent = {
        title: "ShareContent",
        message: "Hello world",
    };
    test("Renders correctly", () => {
        render(<ShareButton shareContent={shareContent} showIcon />);
        //Button
        expect(screen.getByRole("button")).toBeDefined();
        //Share icon
        expect(screen.getByTestId("ShareIcon")).toBeDefined();
        //Share label
        expect(screen.getByText(translate("share"))).toBeDefined();
    });

    test("Calls share method correcly", () => {
        const { share } = new UseShareMock();
        render(<ShareButton shareContent={shareContent} />);
        const btn = screen.getByRole("button");
        expect(btn).toBeDefined();
        fireEvent.press(btn);
        expect(share).toHaveBeenCalled();
    });
});
