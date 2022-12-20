import CreateAccountSuccessScreen from "module/wallet/screen/CreateAccountSuccessScreen/CreateAccountSuccessScreen";
import { fireEvent, render, screen, translate } from "test-utils";

describe("CreateAccountSuccessScreen", () => {
    test("should render", async () => {
        const handleOnSubmit = jest.fn();
        render(<CreateAccountSuccessScreen onSubmit={handleOnSubmit} />);
        //Close button
        const btn = screen.getByText(translate("close"));
        expect(btn).toBeDefined();
        fireEvent.press(btn);
        expect(handleOnSubmit).toHaveBeenCalled();
    });
});
