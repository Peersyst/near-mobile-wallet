import { translate } from "locale"
import AccountCard from "module/wallet/component/core/AccountCard/AccountCard"
import { render } from "test-utils"
import { cells } from "../../../mock/cells"

describe("Test for the account card", () => {
    test("Renders correctly", () => {
        const mockedCell = cells[0]
        const screen = render(<AccountCard colorIndex={0} cell={mockedCell} />)

        /**Account header */
        expect(screen.getByText(translate("my_account"))).toBeDefined();
        expect(screen.getByTestId("StarIcon")).toBeDefined();
        expect(screen.getByTestId("CopyIcon")).toBeDefined();

        /**Account Balance */
        expect(screen.getByText(translate("token"))).toBeDefined();
        expect(screen.getByText(`${mockedCell.balance.split(".")[0]}.`)).toBeDefined();
        expect(screen.getByText(mockedCell.balance.split(".")[1])).toBeDefined();

        /**Account Buttons */
        expect(screen.getByText(translate("send"))).toBeDefined();
        expect(screen.getByTestId("ReceiveIcon")).toBeDefined();
        expect(screen.getByTestId("SendIcon")).toBeDefined();
        expect(screen.getByText(translate("receive"))).toBeDefined();
    })
})