import SelectGroup from "module/common/component/input/SelectGroup/SelectGroup";
import { fireEvent, render } from "test-utils";

describe("Select group tests", () => {
    test("Renders correctly", () => {
        const mockedFunction = jest.fn();
        const screen = render(<SelectGroup label="Select your network" options={["test1", "test2"]} onChange={mockedFunction} />);
        expect(screen.getAllByText("Select your network")).toHaveLength(2);
        const items = screen.getAllByText("test1");
        expect(screen.getByText("test2")).toBeDefined();
        fireEvent.press(items[1]);
        expect(mockedFunction).toHaveBeenCalled();
    });
});
