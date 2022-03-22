import SelectGroup, { optionType } from "module/common/component/input/SelectGroup/SelectGroup";
import { fireEvent, render } from "test-utils";

describe("Select group tests", () => {
    test("Renders correctly", () => {
        const mockedFunction = jest.fn();
        const feeOptions: optionType[] = [
            {
                label: "test1",
                value: "test1",
            },
            {
                label: "test2",
                value: "test2",
            },
        ];
        const screen = render(<SelectGroup label="Select your network" options={feeOptions} onChange={mockedFunction} />);
        expect(screen.getAllByText("Select your network")).toHaveLength(2);
        const items = screen.getAllByText("test1");
        expect(screen.getByText("test2")).toBeDefined();
        fireEvent.press(items[0]);
        expect(mockedFunction).toHaveBeenCalled();
    });
});
