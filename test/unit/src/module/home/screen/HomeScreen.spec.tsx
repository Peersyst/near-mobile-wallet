import { render, translate } from "test-utils";
import HomeScreen from "module/home/screen/HomeScreen";
import { UseGetServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("HomeScreen tests", () => {
    new UseGetServiceInstanceMock();
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly when a wallet is selected", () => {
        new UseWalletStateMock();
        const screen = render(<HomeScreen />);
        expect(screen.getByText(translate("transactions"))).toBeDefined();
    });

    test("Renders correctly when a wallet is not selected", () => {
        const screen = render(<HomeScreen />);
        expect(screen.getByText(translate("create_a_wallet"))).toBeDefined();
    });
});
