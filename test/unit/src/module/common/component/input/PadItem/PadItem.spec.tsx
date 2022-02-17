import { CrossIcon } from "icons";
import PadItem from "module/common/component/input/PadItem/PadItem";
import { render } from "test-utils";


describe("Paditem test", () => {
    test("Renders PadItem with a number correctly", () => {
        const screen = render(<PadItem number={2} />);
        expect(screen.getByText("2"));
    
    });
    test("Renders PadItem with an icon correctly", () => {
        const screen = render(<PadItem icon={<CrossIcon />} />)
        expect(screen.getByTestId("CrossIcon"));
    });
});