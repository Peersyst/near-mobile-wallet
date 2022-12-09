import AddCustomNameWarning from "module/wallet/screen/AddCustomNameWarning/AddCustomNameWarning";
import { fireEvent, render, screen } from "test-utils";

describe("Add custom name warning", () => {
    test("Renders correctly", () => {
        const handleSubmit = jest.fn();
        render(<AddCustomNameWarning submitText="Continue" onSubmit={handleSubmit} />);
        const btn = screen.getByText("Continue");
        expect(btn).toBeDefined();
        fireEvent.press(btn);
        expect(handleSubmit).toBeCalledTimes(1);
    });
});
