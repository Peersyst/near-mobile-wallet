import { render } from "test-utils";
import { LogotipIcon } from "module/common/component/display/Logos/LogotipIcon/LogotipIcon";

describe("LogotipIcon tests", () => {
    test("Renders correctly", () => {
        const screen = render(<LogotipIcon color={"red"} width={300} height={300}/>);
        const isotipIcon = screen.getByTestId("LogotipIcon");
        expect(isotipIcon.props.width).toEqual(300);
        expect(isotipIcon.props.height).toEqual(300);
    });
});
