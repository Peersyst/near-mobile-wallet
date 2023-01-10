import NftAmountInput from "module/transaction/component/input/AssetAmountInput/NftAmountInput/NftAmountInput";
import { render, screen, translate } from "test-utils";

describe("NftAmountInput Test", () => {
    test("Renders correctly", () => {
        render(<NftAmountInput placeholder="Enter amount" />);
        const input = screen.getByPlaceholderText("Enter amount");
        expect(input).toBeDefined();
        expect(input.props.value).toBe("1");
        expect(input.props.editable).toBe(false);
        expect(translate("send_only_one_nft")).toBeDefined();
    });
});
