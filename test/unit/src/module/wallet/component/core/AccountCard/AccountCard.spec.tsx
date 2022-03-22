import { translate } from "locale";
import AccountCard from "module/wallet/component/core/AccountCard/AccountCard";
import { render, SuccessApiCall } from "test-utils";
import { cells } from "mocks/cells";
import * as GetBalance from "module/wallet/mock/getBalance";
import { waitFor } from "@testing-library/react-native";

describe("Test for the account card", () => {
    test("Renders correctly", async () => {
        jest.spyOn(GetBalance, "default").mockReturnValue(SuccessApiCall("10400"));
        const mockedCell = cells[0];
        const screen = render(<AccountCard cell={mockedCell} />);

        /**Account header */
        expect(screen.getByText(translate("my_account"))).toBeDefined();
        expect(screen.getByTestId("StarIcon")).toBeDefined();
        expect(screen.getByTestId("CopyIcon")).toBeDefined();

        /**Account Balance */
        await waitFor(() => expect(screen.getByText("10,400")).toBeDefined());
        expect(screen.getByText("000000")).toBeDefined();
        expect(screen.getByText("ckb")).toBeDefined();

        /**Account Buttons */
        expect(screen.getByText(translate("send"))).toBeDefined();
        expect(screen.getByTestId("ReceiveIcon")).toBeDefined();
        expect(screen.getByTestId("SendIcon")).toBeDefined();
        expect(screen.getByText(translate("receive"))).toBeDefined();
    });
});
