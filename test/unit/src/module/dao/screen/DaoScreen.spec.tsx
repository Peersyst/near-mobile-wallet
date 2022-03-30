import { MockedDaoBalance } from "mocks/dao";
import DaoScreen from "module/dao/screen/DaoScreen";
import { render, SuccessApiCall, waitFor } from "test-utils";
import * as GetDaoBalance from "module/dao/mock/getDaoBalance";
import { translate } from "locale";

describe("Test for the DaoScreen", () => {
    test("Renders correctly", async () => {
        jest.spyOn(GetDaoBalance, "default").mockReturnValue(SuccessApiCall(MockedDaoBalance));
        const screen = render(<DaoScreen />);
        //Dao Card
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
        /**Account Balance */
        await waitFor(() => expect(screen.getByText("12,635")).toBeDefined());
    });
});
