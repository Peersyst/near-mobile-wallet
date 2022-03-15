import ReceiveScreen from "module/transaction/screen/ReceiveScreen";
import { render } from "test-utils";
import * as Router from "module/common/hook/useRoute";
import { cells } from "mocks/cells";
import { getMockedRouter } from "mocks/router";
import { MainScreens } from "module/main/MainNavigatorGroup";

describe("Test fot the receive screen", () => {
    const mockedRouter = getMockedRouter(MainScreens.RECEIVE, { address: cells[0].address })
    test("Renders correctly", () => {
        jest.spyOn(Router, "default").mockReturnValue(mockedRouter);
        const screen = render(<ReceiveScreen />);
        expect(screen.getByText(cells[0].address)).toBeDefined();
    });
});
