import { render, SuccessApiCall } from "test-utils";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import { translate } from "locale";
import { fireEvent } from "@testing-library/react-native";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

describe("MainTabs tests", () => {
    test("Renders correctly", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getTransactions").mockReturnValue(SuccessApiCall([]));

        const screen = render(<MainTabs />);

        expect(screen.getAllByText(translate("transactions"))).toHaveLength(1);
        fireEvent.press(screen.getByText(translate("currencies")));
        expect(screen.getAllByText(translate("currencies"))).toHaveLength(1);
        fireEvent.press(screen.getByText(translate("nfts")));
        expect(screen.getAllByText(translate("nfts"))).toHaveLength(1);
    });
});
