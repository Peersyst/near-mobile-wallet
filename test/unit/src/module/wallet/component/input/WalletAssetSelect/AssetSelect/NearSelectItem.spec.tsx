import NEARSelectItem from "module/wallet/component/input/WalletAssetSelect/AssetSelect/NEARSelectItem";
import { UseGetBalanceMock } from "test-mocks";
import { render } from "test-utils";

describe("NearSelectItem test", () => {
    test("Renders correctly and setAssetState correctly", () => {
        new UseGetBalanceMock();
        render(<NEARSelectItem />);
    });
});
