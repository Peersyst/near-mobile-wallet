import { render, SuccessApiCall } from "test-utils";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import DaoTabs from "module/dao/navigation/DaoTabs/DaoTabs";
import { mockedDaoTransactions } from "mocks/daoTransaction";
import * as GetDaoTransactions from "module/dao/mock/getDaoTransactions";

describe("DaoTabs tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly", async () => {
        jest.spyOn(GetDaoTransactions, "default").mockReturnValue(SuccessApiCall(mockedDaoTransactions));
        const screen = render(<DaoTabs />);
        await waitFor(() => expect(screen.getByText("01/01/2022 - 00:00")));
        expect(screen.getByText(translate("deposits"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("completed")));
        expect(screen.getByText("DaoTab2")).toBeDefined();
    });
});
