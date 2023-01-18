import Button from "module/common/component/input/Button/Button";
import SendTransactionModal from "module/transaction/component/feedback/SendTransactionModal/SendTransactionModal";
import { fireEvent, render, screen, translate } from "test-utils";

describe("SendTransactionModal tests", () => {
    test("Renders correctly", async () => {
        const mockedStatusState = { isLoading: true, isError: true, isSuccess: true };
        const mockedSendTransaction = jest.fn().mockResolvedValue(true);

        render(
            <SendTransactionModal useMutationStatusResult={mockedStatusState} sendTransaction={mockedSendTransaction}>
                {({ showModal }) => <Button onPress={showModal}>showModal</Button>}
            </SendTransactionModal>,
        );
        const showBtn = screen.getByRole("button", { name: "showModal" });
        expect(showBtn).toBeDefined();
        //Click on the button to show the confirm pin modal
        fireEvent.press(showBtn);
        //Shows the modal
        expect(screen.getByText(translate("confirm_your_pin"))).toBeDefined();
    });
});
