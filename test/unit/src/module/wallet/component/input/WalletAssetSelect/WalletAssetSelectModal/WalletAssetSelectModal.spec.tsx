import { WalletAssetSelectModal } from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelectModal/WalletAssetSelectModal";
import { render } from "test-utils";

describe("WalletAssetSelectModal", () => {
    test("Renders without assets and calls on press fn", () => {
        const hideModalMock = jest.fn();
        render(<WalletAssetSelectModal hideModal={hideModalMock} />);
        //Navbar

        //InnerAssetSelect
    });
});
